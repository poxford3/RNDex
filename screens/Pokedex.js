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
} from "react-native";
import { genList } from "../assets/generations";

export default function PokemonList({ navigation }) {
  const [pokeList, setPokeList] = useState([]);
  const [pokeInfo, setPokeInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [limit, setLimit] = useState(151);
  const [offset, setOffset] = useState(0);

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  // functions
  const getPokeList = async () => {
    let tempList = [];
    const response = await fetch(url);
    const json = await response.json();

    json.results.forEach((e) => {
      // console.log(e.name);
      tempList.push(e);
    });

    setPokeList(tempList);
    setLoaded(true);

    // getPokeInfo(pokeList);

    // -- attempt 2 below

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((pokeData) => {
    //     pokeData.results.forEach((pokemon) => {
    //       getPokeInfo(pokeData);
    //     });
    //   });

    // console.log(json);
  };

  const getPokeInfo = (pokemon) => {
    // console.log(pokemon);
    // let tempList2 = [];
    // let url2 = pokemon.url;
    // const response2 = await fetch(url2);
    // const json2 = await response2.json();
    // json2.forEach((e) => {
    //   let poke = {
    //     pokeName: pokemon.name,
    //     id: e.id,
    //     sprite: e.sprites.front_default,
    //   };
    //   tempList2.push(poke);
    // });
    // setPokeInfo(tempList2); // stopped here, getting weird error zzz
    // -- attempt 2 below
    // let url = pokemon.url;
    // fetch(url)
    //   .then((response) => response.json)
    //   .then((pokeData) => {
    //     setPokeInfo(...pokeInfo, pokeData.name);
    //   });
  };

  // custom components
  const GenSelector = ({ limit, offset, text }) => {
    return (
      <TouchableOpacity
        style={styles.genButtons}
        onPress={() => {
          setLimit(limit);
          setOffset(offset);
          console.log(text);
        }}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getPokeList();
    // console.log(genList[2].text);
    // console.log(pokeList);
  }, [limit]);

  // view
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 36,
            textAlign: "center",
          }}
        >
          Pokemon List
        </Text>
        <View style={styles.genSelection}>
          <GenSelector limit={5} offset={30} text={"test"} />
          <FlatList
            data={genList}
            horizontal={true}
            renderItem={({ item }) => {
              <>
                <Text>{item.text}</Text>
                {/* <GenSelector
                  limit={item.limit}
                  offset={item.offset}
                  text={item.text}
                /> */}
              </>;
            }}
          />
          <GenSelector limit={6} offset={60} text={"testEnd"} />
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
        <FlatList
          data={pokeList}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.outerBox}>
              <TouchableOpacity style={styles.innerBox}>
                <Image
                  source={require("../assets/arse.jpeg")}
                  style={styles.images}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    borderRadius: 10,
    padding: 10,
  },
  genSelection: {
    flexDirection: "row",
    height: 40,
    // backgroundColor: "lime",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  header: {
    alignItems: "center",
    flex: 1,
  },
  images: {
    height: 80,
    width: 80,
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
  outerBox: {
    width: "50%",
    height: 180,
    // borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonBox: {
    alignItems: "center",
    width: "100%",
    flex: 8,
  },
});
