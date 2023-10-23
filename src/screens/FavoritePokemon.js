import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import capitalizeString from "../hooks/capitalizeString";
import { getData } from "../config/asyncStorage";

export default function FavoritePokemon() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [favPokeList, setFavPokeList] = useState([]);

  const renderIDs = ({ item }) => {
    const date_show = new Date(item.date_added).toLocaleString();
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={{ color: activeColors.textColor }}>{item.id}</Text>
        <Text style={{ color: activeColors.textColor }}>
          {capitalizeString(item.pokeName)}
        </Text>
        <Text style={{ color: activeColors.textColor }}>{date_show}</Text>
      </View>
    );
  };

  const fetchStoredPokemon = async () => {
    try {
      const favPokes = await getData("favPokeList");

      if (favPokes) {
        setFavPokeList(favPokes);
      }
    } catch ({ message }) {
      console.log("fetch fav poke error", message);
    }
  };

  useEffect(() => {
    fetchStoredPokemon();
  }, []);

  // newest to oldest
  // const dataToShow = favPokeList.sort((a, b) =>
  //   b.date_added > a.date_added ? 1 : -1
  // );

  // oldest to newest
  // const dataToShow = favPokeList.sort((a, b) =>
  //   b.date_added < a.date_added ? 1 : -1
  // );

  // sort by id
  const dataToShow = favPokeList.sort((a, b) => a.id - b.id);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Text style={{ color: activeColors.textColor }}>FavoritePokemon</Text>
      <FlatList data={dataToShow} renderItem={renderIDs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
