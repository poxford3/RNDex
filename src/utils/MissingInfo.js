import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

export default function MissingInfo({ id, str }) {
  return (
    <View
      style={{
        height: Dimensions.get("window").height - 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        }}
        style={styles.pokemonImg}
      />
      <Text style={{ textAlign: "center" }}>{str}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pokemonImg: {
    height: 90,
    width: 90,
    marginHorizontal: 10,
  },
});
