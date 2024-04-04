import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import { all_pokemon } from "../../assets/all_pokemon";
import API_CALL from "../hooks/API_CALL";
import { PokemonItem } from "./PokemonComponents/PokemonItem";
import PokemonList from "./PokemonComponents/PokemonList";

export default function DirectSearch({ pokemon }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo, updatePokemon } = useContext(PokemonContext);
  const navigation = useNavigation();

  const all_poke_names = all_pokemon.results;
  const pokeNameCleanInput =
    pokemon == undefined ? "" : pokemon.toLowerCase().trim();

  // hi zoe :)

  const AutocompleteNames = () => {
    return (
      <View style={{ flex: 1 }}>
        {completePokes ? (
          <View style={{ alignItems: "center", flex: 1, width: "100%" }}>
            <Text style={{ color: activeColors.textColor, fontSize: 26 }}>
              Other Generations
            </Text>
            <PokemonList pokeItems={completePokes} />
          </View>
        ) : (
          <Text style={{ color: activeColors.textColor, fontSize: 26 }}>
            No Pokémon with that name
          </Text>
        )}
      </View>
    );
  };

  const [completePokes, setCompletePokes] = useState(null);
  useEffect(() => {
    let searchFilteredData = all_poke_names.filter((x) =>
      x.pokeName.includes(pokeNameCleanInput)
    ); // maybe startsWith() instead of filter ?
    setCompletePokes(searchFilteredData.length > 0 ? searchFilteredData : null);
  }, [pokemon]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {/* <SearchButton />
      <PopupText /> */}
      <AutocompleteNames />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  directButton: {
    padding: 10,
    marginTop: 10,
    maxWidth: 290,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "grey",
  },
});
