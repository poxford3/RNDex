import React, { useContext } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function MissingInfo({ id, str }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <View
      style={{
        height: "100%",
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
      <Text style={{ textAlign: "center", color: activeColors.textColor }}>
        {str}
      </Text>
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
