import React from "react";
import { Image } from "react-native";

export default function HeaderImage({ route }) {
  // console.log("in nav", route.params.sprite);
  // const pic = route.params.sprite;
  // console.log("header id", route.params.id);
  const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${route.params.id}.png`;

  return (
    <Image
      style={{ width: 200, height: 50 }}
      source={{ uri: pic }}
      resizeMode="contain"
    />
  );
}
