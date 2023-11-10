import React from "react";
import { Image } from "react-native";

export default function HeaderImage({ id }) {
  const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Image
      style={{ width: 200, height: 50, top: -5 }}
      source={{ uri: pic }}
      resizeMode="contain"
    />
  );
}
