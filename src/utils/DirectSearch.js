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

export default function DirectSearch({ pokemon }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo, updatePokemon } = useContext(PokemonContext);
  const navigation = useNavigation();

  const all_poke_names = all_pokemon.results;
  const pokeName = pokemon == undefined ? "" : pokemon.toLowerCase().trim();

  const [pokeFound, setPokeFound] = useState(true);

  const handleDirectSearch = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    const response = await API_CALL(url);

    if (response == undefined) {
      console.log("bad");
      setPokeFound(false);
    } else {
      updatePokemon({ id: response.id, pokeName: response.name });
      navigation.navigate("PokemonTabNav");
    }
  };

  // hi zoe :)

  const SearchButton = () => {
    return (
      <TouchableOpacity
        style={[styles.directButton, { backgroundColor: activeColors.accent }]}
        onPress={() => {
          handleDirectSearch();
        }}
      >
        <Image
          source={require("../../assets/info_imgs/poke-ball.png")}
          style={{ height: 40, width: 40 }}
        />
        <Text style={{ color: activeColors.textColor, fontSize: 22 }}>
          Direct Search
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          color={activeColors.textColor}
          size={30}
        />
      </TouchableOpacity>
    );
  };

  const PopupText = () => {
    return (
      <View style={{ padding: 10 }}>
        {!pokeFound ? (
          <Text
            style={{
              color: activeColors.textColor,
              fontSize: 26,
              marginTop: 10,
            }}
          >
            Could not find "{pokemon}", please check your spelling and try again
          </Text>
        ) : null}
      </View>
    );
  };

  const AutocompleteNames = () => {
    return (
      <View style={{ flex: 1 }}>
        {completePokes ? (
          <View style={{ alignItems: "center", flex: 1, width: "100%" }}>
            <Text style={{ color: activeColors.textColor, fontSize: 26 }}>
              Other Generations
            </Text>
            <FlatList
              data={completePokes}
              numColumns={2}
              maxToRenderPerBatch={10}
              keyExtractor={(item) => item.url}
              initialNumToRender={30}
              renderItem={({ item }) => {
                return (
                  <PokemonItem
                    pokeName={item.name}
                    id={item.url.split("/")[6]}
                    width_percent={50}
                  />
                );
              }}
            />
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
      x.name.includes(pokeName)
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
