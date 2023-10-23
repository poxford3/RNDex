import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { getData } from "../config/asyncStorage";

export default function FavoritePokemon() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [favPokeList, setFavPokeList] = useState([]);

  const renderIDs = ({ item }) => {
    return (
      <View>
        <Text style={{ color: activeColors.textColor }}>{item}</Text>
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Text style={{ color: activeColors.textColor }}>FavoritePokemon</Text>
      <FlatList data={favPokeList} renderItem={renderIDs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
