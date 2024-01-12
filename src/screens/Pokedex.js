import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import genList from "../../assets/generations";
import LoadingView from "../utils/LoadingView";
import { PokemonItem } from "../utils/PokemonComponents/PokemonItem";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import DirectSearch from "../utils/DirectSearch";
import API_CALL from "../hooks/API_CALL";
import CustomDivider from "../utils/CustomDivider";

export default function Pokedex({ navigation }) {
  // variables
  const [pokeList, setPokeList] = useState([]);
  const [loaded, setLoaded] = useState(true);

  const [genSelected, setGenSelected] = useState(1);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // functions

  // does inital call of API that gets list of pokemon,
  // based on gen selected
  const getPokeList = async ({ gen }) => {
    setLoaded(false);
    setPokeList([]);
    const url = `https://pokeapi.co/api/v2/generation/${gen}`;
    const json = await API_CALL(url);

    let tempPokeList = []; // Temporary array to hold values

    json.pokemon_species.forEach((e) => {
      tempPokeList.push({
        pokeName: e.name,
        pokeID: parseInt(e.url.split("/")[6]),
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
  const searchFilteredData = searchText
    ? pokeList.filter((x) =>
        x.pokeName.toLowerCase().includes(searchText.toLowerCase())
      )
    : pokeList;

  const Body = () => {
    return (
      <>
        {searchFilteredData.length > 0 ? (
          // <FlatList
          //   data={searchFilteredData.sort((a, b) => a.pokeID - b.pokeID)}
          //   numColumns={2}
          //   maxToRenderPerBatch={10}
          //   keyExtractor={(item) => item.pokeID}
          //   initialNumToRender={30}
          //   renderItem={({ item }) => (
          //     <PokemonItem
          //       pokeName={item.pokeName}
          //       id={item.pokeID}
          //       width_percent={50}
          //       gen={genSelected}
          //     />
          //   )}
          // />
          <ScrollView>
            <PokemonList />
          </ScrollView>
        ) : (
          <DirectSearch pokemon={searchText} />
        )}
      </>
    );
  };

  const PokemonList = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {searchFilteredData
          .sort((a, b) => a.pokeID - b.pokeID)
          .map((pokemon, idx) => {
            return (
              <PokemonItem
                pokeName={pokemon.pokeName}
                id={pokemon.pokeID}
                width_percent={50}
                gen={genSelected}
                key={idx}
              />
            );
          })}
      </View>
    );
  };

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
    getPokeList({ gen: 1 });
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
          <Image
            source={require("../../assets/rndex_logo.png")}
            style={{ height: 55, width: 120, resizeMode: "contain" }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Favorites");
            }}
            style={{ width: 40 }}
          >
            <Ionicons
              name="heart-outline"
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
      <CustomDivider direction={"horizontal"} />
      <View style={styles.pokemonBox}>
        {loaded ? (
          <>
            <Searchbar
              style={{
                marginVertical: 5,
                height: 45,
                width: "95%",
                backgroundColor: activeColors.accent,
                borderColor: activeColors.border,
              }}
              keyboardAppearance={activeColors.themeTypeLower}
              iconColor={activeColors.textColor}
              inputStyle={{ color: activeColors.textColor, minHeight: 45 }}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
              placeholder="Find your favorite Pokemon!"
              placeholderTextColor={activeColors.searchBarPlaceholder}
            />
            <Body />
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
    // height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    // paddingVertical: 5,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
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
