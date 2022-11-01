import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  StatusBar,
} from "react-native";
import { genList } from "../assets/generations";

export default function Pokedex({ navigation }) {
  // variables
  const [pokeList, setPokeList] = useState([]);
  const [pokeInfo, setPokeInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // const [limit, setLimit] = useState(151);
  // const [offset, setOffset] = useState(0);

  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);

  const flatListRef = useRef();

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  // functions
  const getPokeList = async () => {
    let tempList = [];
    const response = await fetch(url);
    const json = await response.json();

    json.results.forEach((e) => {
      // console.log(e.name);
      tempList.push(e);
      getPokeInfo(e);
    });

    // setPokeList(tempList);
    // setLoaded(true);
  };

  const getPokeInfo = async (pokemon) => {
    // console.log(pokemon.url);
    let tempList2 = [];
    let url2 = pokemon.url;
    const response2 = await fetch(url2);
    const json2 = await response2.json();

    // console.log(json2.name);
    let poke = {
      pokeName: json2.name,
      // type: json2.types.type.name,
      id: json2.id,
      sprite: json2.sprites.front_default,
    };

    setPokeList([...pokeList, poke]);
    setLoaded(true);
  };

  // custom components
  const GenSelector = ({ limit, offset, text }) => {
    return (
      <TouchableOpacity
        style={styles.genButtons}
        onPress={() => {
          setLimit(limit);
          setOffset(offset);
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
          // console.log(text);
        }}
      >
        <Text style={{ textAlign: "center" }}>{text}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getPokeList();
    console.log(pokeList);
    // console.log(url);
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
          RN Dex
        </Text>
        <View style={styles.genSelection}>
          {/* <Button
            title="to view"
            onPress={() => {
              navigation.navigate("Test");
            }}
          /> */}
          <FlatList
            data={genList}
            ref={flatListRef}
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              // maxWidth: "90%",
            }}
            renderItem={({ item }) => (
              <GenSelector
                limit={item.limit}
                offset={item.offset}
                text={item.text}
              />
            )}
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
        <FlatList
          data={pokeList}
          numColumns={2}
          initialNumToRender={20}
          renderItem={({ item }) => (
            <View style={styles.outerBox}>
              <TouchableOpacity style={styles.innerBox}>
                <Image
                  // source={require("../assets/arse.jpeg")}
                  source={{ uri: item.sprite }}
                  style={styles.images}
                />
                <Text style={{ textTransform: "capitalize" }}>
                  {item.pokeName}
                </Text>
                {item.type ? (
                  <Text style={{ textTransform: "capitalize" }}>
                    {item.type}
                  </Text>
                ) : (
                  <></>
                )}
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
    height: 40,
    width: "100%",
    // backgroundColor: "lime",
    alignItems: "center",
    justifyContent: "center",
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
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonBox: {
    alignItems: "center",
    width: "100%",
    flex: 8,
  },
});
