import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { storeData, getData } from "../config/asyncStorage";

export default function FavoritePokemonButton({ id, pokeName }) {
  // will need to set up async storage to store people's favorites
  const [heartToggle, setHeartToggle] = useState(false);
  const [favPokeList, setFavPokeList] = useState([]);

  let { nameShow, colorShow } = heartToggle
    ? { nameShow: "heart", colorShow: "red" }
    : { nameShow: "heart-outline", colorShow: "grey" };

  const handleHeartTap = () => {
    heartToggle ? removeStoredPokemon() : updateFavPokemon();
  };

  const updateFavPokemon = async () => {
    let newFavPoke = {
      id: id,
      pokeName: pokeName,
      date_added: new Date(),
    };
    if (favPokeList.length >= 1) {
      storeData("favPokeList", [...favPokeList, newFavPoke]);
      // console.log("in store 1", newFavPoke.pokeName, newFavPoke.date_added);
      setHeartToggle(true);
    } else {
      storeData("favPokeList", [newFavPoke]);
      setHeartToggle(true);
      // console.log("in store 0", newFavPoke.pokeName);
    }
  };

  const removeStoredPokemon = async () => {
    let newPokeList = favPokeList.filter((e) => e.id != id);
    storeData("favPokeList", newPokeList);
    setHeartToggle(false);
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

  const heartChanger = () => {
    if (favPokeList.filter((e) => e.id === id).length > 0) {
      // console.log("should be red");
      setHeartToggle(true);
    } else {
      setHeartToggle(false);
    }
  };

  useEffect(() => {
    fetchStoredPokemon();
    // setTimeout(() => console.log("useEffect", favPokeList), 1000);
  });

  useEffect(() => {
    heartChanger();
  }, [favPokeList]);

  return (
    <TouchableOpacity
      style={styles.heart}
      onPress={() => {
        handleHeartTap();
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
