import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { storeData, getData } from "../config/asyncStorage";

export default function FavoritePokemonButton({ id, selected }) {
  // will need to set up async storage to store people's favorites
  const [heartToggle, setHeartToggle] = useState(false);
  const [favPokeList, setFavPokeList] = useState([]);

  let { nameShow, colorShow } = heartToggle
    ? { nameShow: "heart", colorShow: "red" }
    : { nameShow: "heart-outline", colorShow: "grey" };

  const handleToggle = () => {
    nameShow = "heart-broken";
    setHeartToggle(!heartToggle);
    updateFavPokemon();
  };

  const updateFavPokemon = async () => {
    console.log("begin of update", favPokeList);
    if (favPokeList.length >= 1) {
      // setFavPokeList([...favPokeList, id])
      storeData("favPokeList", [...favPokeList.sort(), id]);
      console.log("in store 1", id);
    } else {
      storeData("favPokeList", [id]);
      console.log("in store 0", id);
    }
  };

  const fetchStoredPokemon = async () => {
    try {
      const favPokes = await getData("favPokeList");

      if (favPokes) {
        setFavPokeList(favPokes.sort());
      }
    } catch ({ message }) {
      console.log("fetch fav poke error", message);
    }
  };

  useEffect(() => {
    fetchStoredPokemon();

    setTimeout(() => console.log("useEffect", favPokeList), 1000);
  }, []);

  return (
    <TouchableOpacity
      style={styles.heart}
      onPress={() => {
        handleToggle();
      }}
    >
      <MaterialCommunityIcons name={nameShow} color={colorShow} size={30} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heart: {
    position: "absolute",
    zIndex: 1000,
    top: 10,
    right: 10,
  },
});
