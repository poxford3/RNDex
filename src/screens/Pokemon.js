import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory-native";
import { LinearGradient } from "expo-linear-gradient";
import LoadingView from "../utils/LoadingView";
import capitalizeString from "../functions/capitalizeString";
import type_colors from "../../assets/types/type_colors";
import API_CALL from "../functions/API_CALL";
// https://formidable.com/open-source/victory/docs/victory-bar <- actually good documentation

export default function Pokemon({ route }) {
  // console.log("in pokemon", route);
  const pokemonInfo = route.params;
  // console.log("in pokemon", pokemonInfo);
  const sprite_to_use = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`;
  const id_text = pokemonInfo.id.toString().padStart(4, "0");

  const [stats, setStats] = useState([]);
  const [mainColor, setMainColor] = useState(null);
  const [types, setTypes] = useState({
    type1: null,
    type2: null,
  });
  const [desc, setDesc] = useState("");
  const [loaded, setLoaded] = useState(false);

  // API calls

  const getPokeStats = async () => {
    url = `https://pokeapi.co/api/v2/pokemon/${pokemonInfo.pokeName}`;
    let stat_list = [];

    const json = await API_CALL(url);

    // height it 1/10th of a meter
    // weight is 1/10th of a kg

    getDesc(json.id);

    // console.log(json.stats);
    json.stats.forEach((e) => {
      let x_ = e.stat.name.replace("-", "\n");

      stat_list = [
        ...stat_list,
        {
          x: capitalizeString(x_),
          y: e.base_stat,
          // EV: e.effort,
        },
      ];
    });

    let type_obj = {
      type1: json.types[0].type.name,
      type2: json.types[1]?.type?.name,
    };

    setMainColor(type_colors[json.types[0].type.name]);
    setStats(stat_list);
    setLoaded(true);
    setTypes(type_obj);
  };

  const getDesc = async (id) => {
    const url_id = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const json_id = await API_CALL(url_id);

    arr = json_id.flavor_text_entries.filter(
      (elem) => elem.language.name == "en"
    ); // gets most recent description

    description = arr.pop();
    setDesc(description.flavor_text.replace("\n", " "));
  };

  // functional components

  // on start up
  useEffect(() => {
    getPokeStats();
  }, []);

  useEffect(() => {
    getPokeStats();
    // console.log(pokemonInfo.pokeName, pokemonInfo.id);
    // navigation.setOptions({
    //   route: {
    //     sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png`,
    //     pokeName: pokemonInfo.pokeName,
    //     id: pokemonInfo.id,
    //   },
    // });
  }, [route]);

  // console.log(pokemonInfo);
  // will be view of once pokemon is clicked
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={styles.header}>
          <Image
            source={{
              uri: sprite_to_use,
            }}
            style={styles.images}
          />
          <View style={styles.headerText}>
            <View style={styles.headerLeft}>
              <Text style={{ color: "grey", fontSize: 14 }}>#{id_text}</Text>
              <Text
                style={{
                  fontSize: 24,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {pokemonInfo.pokeName}
              </Text>
              <Text
                style={{
                  textTransform: "capitalize",
                  // textAlign: "center",
                  fontSize: 20,
                  color: mainColor ? mainColor : "black",
                }}
              >
                {types.type1} {types.type2 ? `/ ${types.type2}` : ""}
              </Text>
            </View>
            <View
              style={{
                height: "100%",
                width: 1,
                backgroundColor: "#909090",
              }}
            ></View>
            <View style={styles.headerRight}>
              <Text
                style={{
                  textTransform: "capitalize",
                  fontSize: 16,
                  // textAlign: "center",
                }}
              >
                {desc}
              </Text>
            </View>
          </View>
        </View>
        {loaded ? (
          <View
            style={styles.pokeDetails}
            contentContainerStyle={{ paddingBottom: 1 }}
          >
            <View style={styles.statBox}>
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>Stats</Text>
              <View
                style={{
                  width: "100%",
                  borderWidth: 1,
                  borderColor: "#909090",
                  marginTop: 10,
                }}
              ></View>
              <VictoryChart domainPadding={10}>
                <VictoryGroup offset={20}>
                  <VictoryBar
                    data={stats}
                    // domain={{ y: [0, 255] }}
                    // animate={{
                    //   duration: 2000,
                    //   onLoad: { duration: 1000 },
                    // }}
                    horizontal={true}
                    labels={({ datum }) => datum.y}
                    alignment="middle"
                    style={{
                      data: {
                        fill: "blue",
                      },
                    }}
                  />
                </VictoryGroup>
              </VictoryChart>
            </View>
          </View>
        ) : (
          <LoadingView />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  headerRight: {
    width: "50%",
  },
  headerLeft: {
    justifyContent: "center",
    // alignItems: "center",
  },
  images: {
    height: 300,
    width: 300,
  },
  imgList: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  imgSmall: {
    height: 100,
    width: 100,
  },
  pokeDetails: {
    width: "100%",
    // height: 800,
  },
  statBox: {
    // height: "100%",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  statTexts: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});