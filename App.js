import React, { useEffect, useState } from "react";
import { Appearance, NativeModules } from "react-native";
import Navigation from "./src/screens/Navigation";
import { ThemeContext } from "./src/contexts/ThemeContext";
import { storeData, getData } from "./src/config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";
import { PokemonContext } from "./src/contexts/PokemonContext";
import { SpriteContext } from "./src/contexts/SpriteContext";
import SharedGroupPreferences from "react-native-shared-group-preferences";

const group = "group.rndex";

const SharedStorage = NativeModules.SharedStorage;

// keep splash on screen while app loads
SplashScreen.preventAutoHideAsync();

export default function App() {
  const updateWidget = async () => {
    try {
      const favPokes = await getData("favPokeList");

      if (favPokes) {
        try {
          // iOS
          await SharedGroupPreferences.setItem("widgetKey", favPokes, group);
          const loadedData = await SharedGroupPreferences.getItem(
            "widgetKey",
            group
          );
          console.log("loaded", loadedData);
          // console.log("data loaded", favPokes);
        } catch (error) {
          console.log("update widget error", { error });
        }
      }
    } catch ({ message }) {
      console.log("fetch fav poke error (appjs)", message);
    }
  };

  const [theme, setTheme] = useState({ mode: "light" });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode, system: false };
    } else {
      if (newTheme.system) {
        const systemColorScheme = Appearance.getColorScheme();
        mode = systemColorScheme == "dark" ? "dark" : "light";
        newTheme = { ...newTheme, mode };
      } else {
        newTheme = { ...newTheme, system: false };
      }
    }
    setTheme(newTheme);
    storeData("main_theme", newTheme);
  };

  // check for system theme change
  if (theme.system) {
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme({ system: true, mode: colorScheme });
    });
  }

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("main_theme");

      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
      console.log("fetchStore error", message);
    } finally {
      setTimeout(() => SplashScreen.hideAsync(), 500);
    } // TODO remove the finally to see if the system changes happen more quickly when this isn't there
  };

  useEffect(() => {
    fetchStoredTheme();
    fetchStoredSpriteType();
    updateWidget();
    // fetchUserFirstTime();
  }, []);

  // pokemon data
  const [pokemon, setPokemon] = useState({ id: 1, pokeName: "bulbasaur" });

  function updatePokemon(newPoke) {
    setPokemon({ id: newPoke.id, pokeName: newPoke.pokeName });
  }

  // sprite data
  const [sprites, setSprites] = useState({ type: "modern" });

  const updateSprites = (newSpriteType) => {
    setSprites({ type: newSpriteType });
    storeData("spriteType", { type: newSpriteType });
  };

  const fetchStoredSpriteType = async () => {
    try {
      const spriteType = await getData("spriteType");

      if (spriteType) {
        setSprites(spriteType);
      }
    } catch ({ message }) {
      console.log("fetchStore error (sprite)", message);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <PokemonContext.Provider value={{ pokemon, updatePokemon }}>
        <SpriteContext.Provider value={{ sprites, updateSprites }}>
          <Navigation />
        </SpriteContext.Provider>
      </PokemonContext.Provider>
    </ThemeContext.Provider>
  );
}
