import React, { useEffect, useState, useContext } from "react";
import { Appearance } from "react-native";
import Navigation from "../screens/Navigation";
import { ThemeContext } from "./ThemeContext";
import { storeData, getData } from "../config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";

// keep splash on screen while app loads
SplashScreen.preventAutoHideAsync();

export default function ContextContainer() {
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

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <Navigation />
    </ThemeContext.Provider>
  );
}
