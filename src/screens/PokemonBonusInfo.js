import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PokemonContext } from "../contexts/PokemonContext";

export default function PokemonBonusInfo({fullData}) {
  // const pokemonInfo = useContext(PokemonContext).pokemon;

  const AllStats = async () ={
    // const poke_url = ``
  }

  return (
    <View>
      <Text>PokemonBonusInfo</Text>
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
