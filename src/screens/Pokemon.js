import React, { useEffect, useState, useContext, useRef } from "react";
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
import BannderAdComp from "../utils/BannderAdComp";

export default function Pokemon() {
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const id_text = pokemonInfo.id.toString().padStart(4, "0");

  const [stats, setStats] = useState([]);
  const [mainColor, setMainColor] = useState(null);
  const [types, setTypes] = useState({
    type1: null,
    type2: null,
  });
  const [fullData, setFullData] = useState([]);
  const [favoritesData, setFavoritesData] = useState();
  const [desc, setDesc] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const sprite_to_use = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`;
  const shiny_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonInfo.id}.png`;
  const [loaded, setLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);

  let activeColors = themeColors[theme.mode];

  // API calls

  const getPokeStats = async () => {
    setLoaded(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInfo.id}`;
    let stat_list = [];

    const json = await API_CALL(url);
    // console.log(pokemonInfo.pokeName, json.stats);

    // console.log(json.abilities);
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

    // setFullData({ ...json, ...json_id });
    setFullData([json, json_id]);

    const favData = {
      name: json.name,
      id: pokemonInfo.id,
      types: [type_obj.type1, type_obj.type2],
      color: mainColor,
      url: url,
      picture_url: sprite_to_use,
      stats: json.stats,
    };

    setFavoritesData(favData);

    setLoaded(true);
  };

  const getDesc = async (id) => {
    const url_id = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const json_id = await API_CALL(url_id);

    if (json_id != undefined) {
      let arr = json_id.flavor_text_entries.filter(
        (elem) => elem.language.name == "en"
      ); // gets most recent description

      let description = arr.pop();
      let descText =
        description?.flavor_text == null
          ? ""
          : description?.flavor_text.replaceAll("\n", "");

      setDesc(descText);
    } else {
      setDesc("");
    }

    return json_id;
  };

  // on start up
  useEffect(() => {
    getPokeStats();
  }, []);

  // whenever user selects new pokemon, get the new info
  // and scroll back to the top
  const scrollRef = useRef();
  useEffect(() => {
    getPokeStats();
    setIsEnabled(false);
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [pokemonInfo]);

  // will be view of once pokemon is clicked
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {loaded ? (
        <ScrollView style={{ width: "100%" }} ref={scrollRef}>
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
              <View
                style={{
                  alignItems: "flex-end",
                  width: "100%",
                  paddingLeft: 10,
                  paddingTop: 5,
                }}
              >
                <FavoritePokemonButton data={favoritesData} />
              </View>
              <Image
                source={{
                  uri: isEnabled ? shiny_sprite : sprite_to_use,
                }}
                style={styles.images}
              />
            </LinearGradient>
            <View style={styles.headerText}>
              <View style={styles.headerLeft}>
                <Text style={{ color: "grey", fontSize: 14 }}>#{id_text}</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 24,
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: activeColors.textColor,
                  }}
                >
                  {capitalizeString(pokemonInfo.pokeName)}
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
                    fontSize: 16,
                    color: activeColors.textColor,
                  }}
                >
                  {desc}
                </Text>
              </View>
            </View>
          </View>
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
        </ScrollView>
      ) : (
        <LoadingView />
      )}
      <BannderAdComp />
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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headerRight: {
    maxWidth: "50%",
    paddingLeft: 10,
  },
  headerLeft: {
    justifyContent: "center",
    maxWidth: "50%",
  },
  images: {
    height: 300,
    width: 300,
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  statTexts: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
