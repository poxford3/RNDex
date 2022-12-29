import React, { useEffect, useRef, useState } from "react";
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
import uuid from "react-native-uuid";
import { genList } from "../assets/generations";

export default function Pokedex({ navigation }) {
  // variables
  const [pokeList, setPokeList] = useState([]);
  const PARKER = [];
  const pokeList1 = [
    {
      id: 1,
      pokeName: "bulbasaur",
      pokeURL: "https://pokeapi.co/api/v2/pokemon/1",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: 2,
      pokeName: "ivysaur",
      pokeURL: "https://pokeapi.co/api/v2/pokemon/2",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    },
    {
      id: 3,
      pokeName: "venusaur",
      pokeURL: "https://pokeapi.co/api/v2/pokemon/3",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    },
  ];
  const [loaded, setLoaded] = useState(true);
  // const [limit, setLimit] = useState(151);
  // const [offset, setOffset] = useState(0);

  // variables for testing, need to uncomment above once done
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);

  const flatListRef = useRef();

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  // functions

  // does inital call of API that gets list of pokemon,
  // based on the limit/offset params
  const getPokeList = async () => {
    setPokeList([]);
    setLoaded(false);
    let tempList = [];
    const response = await fetch(url);
    const json = await response.json();

    json.results.forEach((e) => {
      getPokeInfo(e);
    });

    // console.log(limit, pokeList.length);
    if (pokeList.length !== limit) {
      setLoaded(true);
    }

    // var sequential = new Promise((resolve, reject) => {
    //   json.results.forEach((e, index, json) => {
    //     // console.log(e, index, json.length);
    //     getPokeInfo(e).then((result) => {
    //       tempList.push(result);
    //       // console.log(tempList);
    //     });
    //     if (index === json.length - 1) resolve();
    //   });
    // });

    // sequential.then(() => {
    //   console.log("made it here");
    //   // console.log(tempList);
    //   setPokeList(
    //     // sorting to ensure the id's line up
    //     tempList.sort((a, b) => {
    //       return a.id - b.id;
    //     })
    //   );
    //   // console.log(pokeList.length, pokeList1.length);
    //   setLoaded(true);
  };

  // takes list of pokemon names and URLs
  // and gets data from URL provided by API
  const getPokeInfo = async (pokemon) => {
    let url2 = pokemon.url;
    const response2 = await fetch(url2);
    const json2 = await response2.json();

    let poke = {
      pokeName: json2.name,
      id: json2.id,
      sprite: json2.sprites.front_default,
      pokeURL: url2,
      spriteData: json2.sprites,
      key: uuid,
    };
    // console.log(poke);

    // PARKER = [...PARKER, poke];
    console.log(poke.pokeName);
    setPokeList([...pokeList, poke]);
    // console.log(poke);
    // return poke;
  };

  // custom components
  const GenSelector = ({ limit, offset, text }) => {
    return (
      <TouchableOpacity
        style={styles.genButtons}
        onPress={() => {
          setLimit(limit);
          setOffset(offset);
          // setPokeList([]);
          // getPokeList();
          console.log(`gen ${text} selected`);
          flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }}
      >
        <Text style={{ textAlign: "center" }}>{text}</Text>
      </TouchableOpacity>
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

  useEffect(() => {
    getPokeList();
    // console.log(limit);
    setTimeout(() => {
      console.log("pokeList length:", pokeList.length, "items");
      // console.log("pokeList:", pokeList);
    }, 3000);
  }, [limit]);

  useEffect(() => {
    getPokeList();
  }, []);

  // view
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 36,
            textAlign: "center",
            fontStyle: "italic",
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
      {/* <PokemonItem // for testing
        sprite={pokeList1[0].sprite}
        pokeName={pokeList1[0].pokeName}
        type={pokeList1[0].type}
      /> */}
      <View style={styles.pokemonBox}>
        {loaded ? (
          <FlatList
            data={pokeList}
            // extraData={pokeList}
            numColumns={2}
            // keyExtractor={(item) => item.id}
            initialNumToRender={40}
            // style={{ width: "95%" }}
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
});
