import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
// import Icon from "react-native-ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { genList } from "../assets/generations";

export default function Pokedex({ navigation }) {
  // variables

  const [pokeList, setPokeList] = useState([]);
  const pokeList1 = [
    {
      id: 1,
      pokeName: "bulbasaur",
      pokeURL: "https://pokeapi.co/api/v2/pokemon/1",
      type: "grass",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: 2,
      pokeName: "ivysaur",
      pokeURL: "https://pokeapi.co/api/v2/pokemon/2",
      type: "grass",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    },
    {
      id: 3,
      pokeName: "venusaur",
      pokeURL: "https://pokeapi.co/api/v2/pokemon/3",
      type: "grass",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    },
  ];
  const [loaded, setLoaded] = useState(true);
  const [limit, setLimit] = useState(151);
  const [offset, setOffset] = useState(0);

  const [genSelected, setGenSelected] = useState(1);

  // const flatListRef = useRef();

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  // functions

  // does inital call of API that gets list of pokemon,
  // based on the limit/offset params
  const getPokeList = async () => {
    setPokeList([]);
    const response = await fetch(url);
    const json = await response.json();

    let tempPokeList = []; // Temporary array to hold values
    const tasks = []; // To hold promises

    json.results.forEach((e) => {
      const task = getPokeInfo(e).then((details) => {
        tempPokeList.push(details);
      });
      tasks.push(task);
    });

    await Promise.all(tasks); // Ensure all async operations are completed before setting the state
    setPokeList((prevList) => [...prevList, ...tempPokeList]);
  };

  // takes list of pokemon names and URLs
  // and gets data from URL provided by API
  const getPokeInfo = async (pokemon) => {
    let url_poke = pokemon.url;
    // console.log(url_poke);
    const response2 = await fetch(url_poke);
    const json2 = await response2.json();

    let poke = {
      pokeName: json2.name,
      id: json2.id,
      sprite: json2.sprites.front_default,
      pokeURL: url_poke,
      type: json2.types[0]?.type?.name,
      spriteData: json2.sprites,
    };

    return poke;
  };

  // custom components

  const GenSelector = ({ limit, offset, text, gen, bkgColor, textColor }) => {
    return (
      <TouchableOpacity
        style={[styles.genButtons, { backgroundColor: bkgColor }]}
        onPress={() => {
          setLimit(limit);
          setOffset(offset);
          setPokeList([]);
          setLoaded(false);
          getPokeList().then(() => {
            setGenSelected(gen);
            console.log(`gen ${text} selected`);
            setLoaded(true);
          });
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

  const PokemonItem = ({ sprite, pokeName, type, url, spriteData }) => {
    return (
      <View style={styles.outerBox}>
        <TouchableOpacity
          style={styles.innerBox}
          onPress={() => {
            // console.log(pokeList.length);
            navigation.navigate("Pokemon", {
              sprite: sprite,
              pokeName: pokeName,
              pokeURL: url,
              type: type,
              spriteData: spriteData,
            });
          }}
        >
          <Image source={{ uri: sprite }} style={styles.images} />
          <Text style={{ textTransform: "capitalize" }}>{pokeName}</Text>
          {type ? (
            <Text style={{ textTransform: "capitalize" }}>{type}</Text>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const LoadingView = () => {
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>;
  };

  // on start up
  useEffect(() => {
    getPokeList();
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
            data={genList}
            horizontal={true}
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
          <FlatList
            data={pokeList.sort((a, b) => a.id - b.id)}
            // extraData={pokeList}
            numColumns={2}
            keyExtractor={(item) => item.id}
            initialNumToRender={40}
            renderItem={({ item }) => (
              <PokemonItem
                sprite={item.sprite}
                pokeName={item.pokeName}
                url={item.pokeURL}
                type={item.type}
                spriteData={item.spriteData}
              />
            )}
          />
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
    height: 90,
    width: 90,
  },
  innerBox: {
    padding: 10,
    width: "90%",
    height: "90%",
    // backgroundColor: "lightgrey",
    borderWidth: 0.5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  outerBox: {
    width: "50%",
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
