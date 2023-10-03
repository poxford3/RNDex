import React, { useState } from "react";
import Navigation from "./src/screens/Navigation";
import { ThemeContext } from "./src/contexts/ThemeContext";

export default function App() {
  const [theme, setTheme] = useState("light");

  const updateTheme = (newTheme) => {
    console.log(newTheme);
    let mode;
    if (!newTheme) {
      mode = theme === "dark" ? "light" : "dark";
      newTheme = mode;
    }
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <Navigation />
    </ThemeContext.Provider>
  );
}
