import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import genList from "../../assets/generations";
import LoadingView from "../utils/LoadingView";

export default function Pokedex({ navigation }) {
  // variables
  const [pokeList, setPokeList] = useState([]);
  const [loaded, setLoaded] = useState(true);
  // const [limit, setLimit] = useState(151);
  // const [offset, setOffset] = useState(0);

  const [genSelected, setGenSelected] = useState(1);

  // functions

  // does inital call of API that gets list of pokemon,
  // based on the limit/offset params
  const getPokeList = async ({ gen, text, limit, offset }) => {
    setPokeList([]);
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    const json = await response.json();

    let tempPokeList = []; // Temporary array to hold values

    json.results.forEach((e) => {
      tempPokeList.push({
        pokeName: e.name,
        pokeID: e.url.split("/")[6],
      });
    });

    setPokeList((prevList) => [...prevList, ...tempPokeList]);
    setGenSelected(gen);
    console.log(`gen ${text} selected`);
    setLoaded(true);
  };

  // custom components

  const GenSelector = ({ limit, offset, text, gen, bkgColor, textColor }) => {
    return (
      <TouchableOpacity
        style={[styles.genButtons, { backgroundColor: bkgColor }]}
        disabled={!loaded}
        onPress={() => {
          // setLimit(limit);
          // setOffset(offset);
          setLoaded(false);
          getPokeList({ gen, text, limit, offset });
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
        limit={item.limit}
        offset={item.offset}
        text={item.text}
        gen={item.gen}
        bkgColor={bkgColor}
        textColor={textColor}
      />
    );
  };

  // const PokemonItem = ({ sprite, pokeName, url, spriteData, id }) => {
  const PokemonItem = ({ pokeName, id }) => {
    const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    // console.log(poke_sprite);

    return (
      <View style={styles.outerBox}>
        <TouchableOpacity
          style={styles.innerBox}
          onPress={() => {
            navigation.navigate("PokemonTabNav", {
              pokeName: pokeName,
              id: id,
            });
          }}
        >
          <Image source={{ uri: poke_sprite }} style={styles.images} />
          <Text style={{ textTransform: "capitalize" }}>{pokeName}</Text>
        </TouchableOpacity>
      </View>
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <View style={styles.header}>
        <View style={styles.topBox}>
          <View style={{ width: 40 }}></View>
          <Text
            style={{
              fontSize: 40,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            RN Dex
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Information");
            }}
          >
            <Ionicons name="information-circle-outline" size={40} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontStyle: "italic" }}>Generation:</Text>
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
          marginTop: 10,
        }}
      ></View>
      <View style={styles.pokemonBox}>
        {loaded ? (
          <>
            <Searchbar
              style={{ width: "90%" }}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
              }}
              placeholder="Find your favorite Pokemon!"
              placeholderTextColor={"grey"}
              // iconColor={"green"}
            />
            <FlatList
              data={searchFilteredData.sort((a, b) => a.pokeID - b.pokeID)}
              // extraData={pokeList}
              numColumns={2}
              keyExtractor={(item) => item.pokeID}
              initialNumToRender={40}
              renderItem={({ item }) => (
                <PokemonItem
                  // sprite={item.sprite}
                  pokeName={item.pokeName}
                  // url={item.pokeURL}
                  // type={item.type}
                  id={item.pokeID}
                  // spriteData={item.spriteData}
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
    // padding: 10,
    marginHorizontal: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  genSelection: {
    flexDirection: "row",
    height: 50,
    // width: "100%",
    // backgroundColor: "lime",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  header: {
    alignItems: "center",
    flex: 1,
    height: 100,
    padding: 5,
    marginBottom: 20,
  },
  images: {
    height: 110,
    width: 110,
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
    width: "50%",
    minWidth: 180,
    height: 180,
    // borderWidth: 1,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
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