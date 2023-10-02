import React, { useState } from "react";
import { StatusBar } from "react-native";
import Navigation from "./src/screens/Navigation";
import { ThemeContext } from "./src/contexts/ThemeContext";

export default function App() {
  const [theme, setTheme] = useState("dark");

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme === "dark" ? "light" : "dark";
      newTheme = mode;
    }
    console.log("theme:", mode);
    setTheme(mode);
  };
  // return <PokemonList />;
  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <Navigation />
      {/* <StatusBar barStyle={activeColors.barStyle} backgroundColor="#000000" /> */}
    </ThemeContext.Provider>
  );
}
