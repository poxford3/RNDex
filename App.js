import React from "react";
import { StatusBar } from "react-native";
import Navigation from "./src/screens/Navigation";
import theme from "./src/styles/theme";

export default function App() {
  let activeColors = theme.dark;
  // return <PokemonList />;
  return (
    <>
      <Navigation />
      <StatusBar barStyle={activeColors.barStyle} backgroundColor="#000000" />
    </>
  );
}
