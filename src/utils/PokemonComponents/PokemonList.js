import React from "react";
import { View } from "react-native";
import { PokemonItem } from "./PokemonItem";

export default function PokemonList({ pokeItems, genSelected }) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {pokeItems.map((pokemon) => {
        return (
          <PokemonItem
            pokeName={pokemon.pokeName}
            id={pokemon.id}
            width_percent={50}
            gen={genSelected ? genSelected : null}
            key={pokemon.id}
          />
        );
      })}
    </View>
  );
}
