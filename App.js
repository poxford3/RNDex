import React, { useEffect, useState } from "react";
import { Appearance } from "react-native";
import Navigation from "./src/screens/Navigation";
import { ThemeContext } from "./src/contexts/ThemeContext";
import { storeData, getData } from "./src/config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";
import { PokemonContext } from "./src/contexts/PokemonContext";

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
    }
  };

  useEffect(() => {
    fetchStoredTheme();
  }, []);

  // pokemon data
  const [pokemon, setPokemon] = useState({ id: 1, pokeName: "bulbasaur" });

  const updatePokemon = (newPoke) => {
    setPokemon({ id: newPoke.id, pokeName: newPoke.pokeName });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <PokemonContext.Provider value={{ pokemon, updatePokemon }}>
        <Navigation />
      </PokemonContext.Provider>
    </ThemeContext.Provider>
  );
}
