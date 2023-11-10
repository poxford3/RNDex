import React, { useContext, memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PokemonContext } from "../../contexts/PokemonContext";
import { useNavigation } from "@react-navigation/native";

export const PokemonItem = memo(function PokemonItem({
  pokeName,
  id,
  width_percent,
}) {
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo, updatePokemon } = useContext(PokemonContext);

  const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  // const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

  return (
    <View style={[styles.outerBox, { width: `${width_percent}%` }]}>
      <TouchableOpacity
        style={[styles.innerBox, { borderColor: activeColors.border }]}
        onPress={() => {
          updatePokemon({ id: id, pokeName: pokeName });
          navigation.navigate("PokemonTabNav");
        }}
      >
        <Image source={{ uri: poke_sprite }} style={styles.images} />
        <Text
          style={{
            textTransform: "capitalize",
            color: activeColors.textColor,
          }}
        >
          {pokeName}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    height: 110,
    // height: 40,
    width: 110,
    // width: 40,
  },
  innerBox: {
    padding: 10,
    width: "90%",
    height: "90%",
    borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  outerBox: {
    minWidth: 180,
    height: 180,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
