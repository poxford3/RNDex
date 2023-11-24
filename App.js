import React, { useEffect, useState } from "react";
import { Appearance } from "react-native";
import Navigation from "./src/screens/Navigation";
import { ThemeContext } from "./src/contexts/ThemeContext";
import { storeData, getData } from "./src/config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";
import { PokemonContext } from "./src/contexts/PokemonContext";
import { SpriteContext } from "./src/contexts/SpriteContext";

// keep splash on screen while app loads
SplashScreen.preventAutoHideAsync();

export default function App() {
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
      setTimeout(() => SplashScreen.hideAsync(), 1000);
    } // TODO remove the finally to see if the system changes happen more quickly when this isn't there
  };

  useEffect(() => {
    fetchStoredTheme();
    fetchStoredSpriteType();
    // fetchUserFirstTime();
  }, []);

  // pokemon data
  const [pokemon, setPokemon] = useState({ id: 1, pokeName: "bulbasaur" });

  const updatePokemon = (newPoke) => {
    setPokemon({ id: newPoke.id, pokeName: newPoke.pokeName });
  };

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

  // // check if user has used app before
  // const [initRouteName, setInitRouteName] = useState();

  // const fetchUserFirstTime = async () => {
  //   try {
  //     const isFirst = await getData("first_time");

  //     if (isFirst) {
  //       console.log("if", isFirst);
  //       setInitRouteName("Pokedex");
  //     } else {
  //       console.log("if else", isFirst);
  //       setInitRouteName("FirstTimeView");
  //     }
  //   } catch ({ message }) {
  //     console.log("user instance", message);
  //   }
  // };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <PokemonContext.Provider value={{ pokemon, updatePokemon }}>
        <SpriteContext.Provider value={{ sprites, updateSprites }}>
          {/* <Navigation initRoute={initRouteName} /> */}
          <Navigation />
        </SpriteContext.Provider>
      </PokemonContext.Provider>
    </ThemeContext.Provider>
  );
}
