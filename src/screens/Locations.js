import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import API_CALL from "../hooks/API_CALL";
import capitalizeString from "../hooks/capitalizeString";
import LoadingView from "../utils/LoadingView";
import MissingInfo from "../utils/MissingInfo";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import box_art from "../../assets/box_art";

export default function Locations() {
  // const pokemonInfo = route.params;
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const [locations, setLocations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getLocations = async (id) => {
    setLoaded(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;
    console.log(url);
    const json = await API_CALL(url);
    let tempLocationList = [];

    // console.log(json[0]);
    json.map((e) => {
      // console.log(capitalizeString(e.location_area.name));
      tempLocationList.push({
        location_name: capitalizeString(e.location_area.name).replace(
          "Area",
          ""
        ),
        game: capitalizeString(e.version_details[0]?.version.name),
        chance: e.version_details[0].encounter_details[0].chance,
        min_level: e.version_details[0].encounter_details[0].min_level,
        max_level: e.version_details[0].encounter_details[0].max_level,
      });
    });

    setLocations(tempLocationList);
    setLoaded(true);
    // console.log(tempLocationList);
  };

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, []);

  const Location = ({ loc }) => {
    // console.log(loc.game.toLowerCase().replace(" ", ""));
    const box_art_pic = box_art[loc.game.toLowerCase().replace(" ", "")];
    const level_disp =
      loc.min_level == loc.max_level
        ? `Lv ${loc.min_level}`
        : `Lv ${loc.min_level} - ${loc.max_level}`;
    return (
      <View
        style={[styles.locationBox, { borderBottomColor: activeColors.accent }]}
      >
        <View style={styles.locLeft}>
          <Text style={[styles.locText, { color: activeColors.textColor }]}>
            {loc.location_name}
          </Text>
          <Text style={styles.miniLocText}>
            {loc.chance}% - {level_disp}
          </Text>
        </View>
        <View style={styles.locRight}>
          <Image source={box_art_pic} style={{ height: 100, width: 100 }} />
          {/* <Text style={{ color: activeColors.textColor, padding: 3 }}>
            {loc.game}
          </Text> */}
        </View>
      </View>
    );
  };

  const Body = () => {
    if (loaded) {
      if (locations.length > 0) {
        return (
          <FlatList
            data={locations}
            // maxToRenderPerBatch={5}
            maxToRenderPerBatch={10}
            renderItem={({ item }) => {
              return <Location loc={item} />;
            }}
          />
        );
      } else {
        return (
          <MissingInfo
            str={`${capitalizeString(
              pokemonInfo.pokeName
            )} has no locations where it can be found in the wild`}
            id={pokemonInfo.id}
          />
        );
      }
    } else {
      return <LoadingView />;
    }
  };

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, [pokemonInfo]);

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View>
        <Text style={[styles.headerText, { color: activeColors.textColor }]}>
          Locations
        </Text>
      </View>
      <View style={styles.list}>
        <Body />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 32,
    padding: 10,
  },
  list: {
    // height: "100%",
    flex: 1,
  },
  locationBox: {
    height: 150,
    padding: 10,
    // borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  locLeft: {
    width: "50%",
  },
  locRight: {
    width: "50%",
    paddingLeft: 10,
    // alignItems: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  locText: {
    fontSize: 26,
    fontWeight: "500",
  },
  miniLocText: {
    fontSize: 18,
    color: "grey",
  },
  pokemonImg: {
    height: 90,
    width: 90,
    marginHorizontal: 10,
  },
});
