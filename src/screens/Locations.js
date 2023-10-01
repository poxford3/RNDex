import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import API_CALL from "../functions/API_CALL";
import capitalizeString from "../functions/capitalizeString";

export default function Locations({ route }) {
  const pokemonInfo = route.params;
  const [locations, setLocations] = useState([]);

  const getLocations = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;
    const json = await API_CALL(url);
    let tempLocationList = [];

    // console.log(json[0]);
    json.map((e) => {
      // console.log(capitalizeString(e.location_area.name));
      tempLocationList.push({
        location_name: capitalizeString(e.location_area.name),
        game: capitalizeString(e.version_details[0]?.version.name),
        chance: e.version_details[0].encounter_details[0].chance,
        min_level: e.version_details[0].encounter_details[0].min_level,
        max_level: e.version_details[0].encounter_details[0].max_level,
      });
    });

    setLocations(tempLocationList);
    // console.log(tempLocationList);
  };

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, []);

  const Location = ({ loc }) => {
    // console.log(loc);
    const level_disp =
      loc.min_level == loc.max_level
        ? `Lv ${loc.min_level}`
        : `Lv ${loc.min_level} - ${loc.max_level}`;
    return (
      <View style={styles.locationBox}>
        <Text style={styles.locText}>
          {loc.location_name} ({level_disp})
        </Text>
        <Text>Game found: {loc.game}</Text>
        <Text style={styles.miniLocText}>
          {loc.chance}% - {level_disp}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Locations</Text>
      <View style={styles.list}></View>
      <FlatList
        data={locations}
        renderItem={({ item }) => {
          return <Location loc={item} />;
        }}
      />
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
  locationBox: {
    height: 150,
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
