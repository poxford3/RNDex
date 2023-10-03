import React, { useState } from "react";
import { StatusBar } from "react-native";
import Navigation from "./src/screens/Navigation";
import { ThemeContext } from "./src/contexts/ThemeContext";

export default function App() {
  const [theme, setTheme] = useState("light");

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme === "dark" ? "light" : "dark";
      newTheme = mode;
    }
    // console.log("theme:", mode);
    setTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <Navigation />
    </ThemeContext.Provider>
  );
}
