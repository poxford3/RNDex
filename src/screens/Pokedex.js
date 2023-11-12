import React, { useEffect, useState, useRef, useContext, memo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import genList from "../../assets/generations";
import LoadingView from "../utils/LoadingView";
import { PokemonItem } from "../utils/PokemonComponents/PokemonItem";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import API_CALL from "../hooks/API_CALL";

export default function Pokedex({ navigation }) {
  // variables
  const [pokeList, setPokeList] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const [genSelected, setGenSelected] = useState(1);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo, updatePokemon } = useContext(PokemonContext);

  // functions

  // does inital call of API that gets list of pokemon,
  // based on the limit/offset params
  const getPokeList = async ({ gen }) => {
    setPokeList([]);
    const url = `https://pokeapi.co/api/v2/generation/${gen}`;
    const json = await API_CALL(url);

    let tempPokeList = []; // Temporary array to hold values

    json.pokemon_species.forEach((e) => {
      tempPokeList.push({
        pokeName: e.name,
        pokeID: e.url.split("/")[6],
      });
    });

    setPokeList((prevList) => [...prevList, ...tempPokeList]);
    setGenSelected(gen);
    setLoaded(true);
  };

  // custom components

  const GenSelector = ({ text, gen, bkgColor, textColor }) => {
    // potentially use the generation's response as a guide for limit/offset
    return (
      <TouchableOpacity
        style={[styles.genButtons, { backgroundColor: bkgColor }]}
        disabled={!loaded}
        onPress={() => {
          setLoaded(false);
          getPokeList({ gen });
        }}
      >
        <Text style={{ textAlign: "center", color: textColor }}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderGen = ({ item }) => {
    const bkgColor = item.gen == genSelected ? "black" : "lightgrey";
    const textColor = item.gen == genSelected ? "white" : "black";

    return (
      <GenSelector
        text={item.text}
        gen={item.gen}
        bkgColor={bkgColor}
        textColor={textColor}
      />
    );
  };

  // search bar tracking
  const [searchText, setSearchText] = useState();
  searchFilteredData = searchText
    ? pokeList.filter((x) =>
        x.pokeName.toLowerCase().includes(searchText.toLowerCase())
      )
    : pokeList;

  // search bar animation
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const searchBarAnim = useRef(new Animated.Value(-45)).current;

  useEffect(() => {
    if (toggleSearchBar) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -45,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [toggleSearchBar]);

  // on start up
  useEffect(() => {
    getPokeList({ gen: 1, text: "I", limit: 151, offset: 0 });
  }, []);

  // main view

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.header}>
        <View style={styles.topBox}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
            }}
            style={{ width: 40 }}
          >
            <Ionicons
              name="settings-outline"
              size={30}
              color={activeColors.textColor}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 40,
              textAlign: "center",
              fontStyle: "italic",
              color: activeColors.textColor,
            }}
          >
            RN Dex
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Information");
            }}
            style={{ width: 40 }}
          >
            <Ionicons
              name="information-circle-outline"
              size={32}
              color={activeColors.textColor}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ fontStyle: "italic", color: activeColors.textColor }}>
          Generation:
        </Text>
        <View style={styles.genSelection}>
          <FlatList
            data={genList.genList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.text}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            renderItem={renderGen}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "black",
          marginVertical: 10,
        }}
      ></View>
      <View style={styles.pokemonBox}>
        {loaded ? (
          <>
            <Searchbar
              style={{
                marginVertical: 5,
                width: "95%",
                backgroundColor: activeColors.accent,
                borderColor: activeColors.border,
              }}
              keyboardAppearance={activeColors.themeTypeLower}
              iconColor={activeColors.textColor}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
              placeholder="Find your favorite Pokemon!"
              placeholderTextColor={activeColors.searchBarPlaceholder}
            />
            <FlatList
              data={searchFilteredData.sort((a, b) => a.pokeID - b.pokeID)}
              numColumns={2}
              maxToRenderPerBatch={10}
              keyExtractor={(item) => item.pokeID}
              initialNumToRender={30}
              renderItem={({ item }) => (
                <PokemonItem
                  pokeName={item.pokeName}
                  id={item.pokeID}
                  width_percent={50}
                  gen={genSelected}
                />
              )}
            />
          </>
        ) : (
          <LoadingView />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  genButtons: {
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  genSelection: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  header: {
    alignItems: "center",
    flex: 1,
    padding: 5,
    marginBottom: 30,
  },
  pokemonBox: {
    alignItems: "center",
    width: "100%",
    flex: 8,
  },
  topBox: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
