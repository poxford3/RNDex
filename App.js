import React, { useState } from "react";
import { Appearance } from "react-native";
import Navigation from "./src/screens/Navigation";
import { ThemeContext } from "./src/contexts/ThemeContext";

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
