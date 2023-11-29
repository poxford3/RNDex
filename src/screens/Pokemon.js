import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoadingView from "../utils/LoadingView";
import PokeBonusInfo from "../utils/PokemonComponents/PokeBonusInfo";
import PokeStats from "../utils/PokemonComponents/PokeStats";
import capitalizeString from "../hooks/capitalizeString";
import type_colors from "../../assets/types/type_colors";
import API_CALL from "../hooks/API_CALL";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import CustomDivider from "../utils/CustomDivider";
import FavoritePokemonButton from "../utils/FavoritePokemonButton";

export default function Pokemon() {
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const sprite_to_use = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`;
  const shiny_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonInfo.id}.png`;
  const id_text = pokemonInfo.id.toString().padStart(4, "0");

  const [stats, setStats] = useState([]);
  const [mainColor, setMainColor] = useState(null);
  const [types, setTypes] = useState({
    type1: null,
    type2: null,
  });
  const [fullData, setFullData] = useState([]);
  const [desc, setDesc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);

  let activeColors = themeColors[theme.mode];

  // API calls

  const getPokeStats = async () => {
    url = `https://pokeapi.co/api/v2/pokemon/${pokemonInfo.id}`;
    let stat_list = [];

    const json = await API_CALL(url);
    // console.log(pokemonInfo.pokeName, json.stats);

    // console.log(json.stats);
    json.stats.forEach((e) => {
      let x_ = e.stat.name.replace("-", " ");

      stat_list = [
        ...stat_list,
        {
          x: capitalizeString(x_).replace(" ", "\n"),
          y: e.base_stat,
          // EV: e.effort, // EVs gained from killing
        },
      ];
    });

    stat_list.push({
      x: "Total",
      y: stat_list.reduce((n, { y }) => n + y, 0), // sums up all the stats
    });

    let type_obj = {
      type1: json.types[0].type.name,
      type2: json.types[1]?.type?.name,
    };

    setMainColor(type_colors[json.types[0].type.name]);
    setStats(stat_list.reverse());
    setTypes(type_obj);

    let json_id = await getDesc(json.id);

    setFullData({ ...json, ...json_id });

    setLoaded(true);
  };

  const getDesc = async (id) => {
    const url_id = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const json_id = await API_CALL(url_id);

    let arr = json_id.flavor_text_entries.filter(
      (elem) => elem.language.name == "en"
    ); // gets most recent description

    let description = arr.pop();
    setDesc(description.flavor_text.replaceAll("\n", " "));

    return json_id;
  };

  // on start up
  useEffect(() => {
    getPokeStats();
  }, []);

  useEffect(() => {
    getPokeStats();
  }, [pokemonInfo]);

  // will be view of once pokemon is clicked
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <FavoritePokemonButton
        id={pokemonInfo.id}
        pokeName={pokemonInfo.pokeName}
      />
      <ScrollView style={styles.body}>
        <View style={styles.header}>
          <LinearGradient
            colors={[
              mainColor,
              mainColor,
              mainColor,
              "transparent",
              "transparent",
            ]}
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: sprite_to_use,
              }}
              style={styles.images}
            />
          </LinearGradient>
          <View style={styles.headerText}>
            <View style={styles.headerLeft}>
              <Text style={{ color: "grey", fontSize: 14 }}>#{id_text}</Text>
              <Text
                style={{
                  fontSize: 24,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  color: activeColors.textColor,
                }}
              >
                {pokemonInfo.pokeName}
              </Text>
              <Text
                style={{
                  textTransform: "capitalize",
                  fontSize: 20,
                  color: mainColor ? mainColor : "black",
                }}
              >
                {types.type1} {types.type2 ? `/ ${types.type2}` : null}
              </Text>
            </View>
            <CustomDivider direction={"vertical"} />
            <View style={styles.headerRight}>
              <Text
                style={{
                  textTransform: "capitalize",
                  fontSize: 16,
                  color: activeColors.textColor,
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
              <CustomDivider direction={"horizontal"} />
              <PokeStats stats={stats} typeColor={mainColor} />
              <PokeBonusInfo
                fullData={fullData}
                typeColor={mainColor}
                types={types}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 32,
                  fontWeight: "bold",
                  color: activeColors.textColor,
                }}
              >
                Shiny Artwork
              </Text>
              <Image source={{ uri: shiny_sprite }} style={styles.images} />
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
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    // width: "95%",
  },
  statTexts: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
