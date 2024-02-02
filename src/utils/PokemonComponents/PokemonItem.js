import React, { useContext, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PokemonContext } from "../../contexts/PokemonContext";
import { SpriteContext } from "../../contexts/SpriteContext";
import { handleGenImageSelect } from "../../hooks/handleGenImageSelect";
import capitalizeString from "../../hooks/capitalizeString";

export const PokemonItem = memo(function PokemonItem({
  pokeName,
  id,
  width_percent,
  gen,
  disabled,
}) {
  const navigation = useNavigation();
  // console.log("gen", gen);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo, updatePokemon } = useContext(PokemonContext);

  const { sprites, updateSprites } = useContext(SpriteContext);
  let og_sprites = sprites.type == "classic" ? true : false;
  let poke_sprite;
  // const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  // const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${id}.png`;

  poke_sprite = handleGenImageSelect({ gen: gen, id: id });

  if (gen == null || poke_sprite.includes("undefined") || !og_sprites) {
    poke_sprite =
      poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  const touchable = disabled ? disabled : false;

  return (
    <View style={[styles.outerBox, { width: `${width_percent}%` }]}>
      <TouchableOpacity
        style={[styles.innerBox, { borderColor: activeColors.border }]}
        disabled={touchable}
        onPress={() => {
          updatePokemon({ id: id, pokeName: pokeName });
          navigation.navigate("PokemonTabNav");
          // navigation.navigate("PokemonTabNav", {
          //   id: id,
          //   pokeName: pokeName,
          // });
        }}
      >
        <Image source={{ uri: poke_sprite }} style={styles.images} />
        <Text
          style={{
            textTransform: "capitalize",
            color: activeColors.textColor,
          }}
        >
          {capitalizeString(pokeName)}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const IMG_SIZE = 110;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    height: IMG_SIZE,
    width: IMG_SIZE,
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
    maxWidth: 270,
    height: 180,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
