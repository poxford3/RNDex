import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function FavoritePokemon() {
  // will need to set up async storage to store people's favorites
  const [heartToggle, setHeartToggle] = useState(false);

  let { nameShow, colorShow } = heartToggle
    ? { nameShow: "heart", colorShow: "red" }
    : { nameShow: "heart-outline", colorShow: "grey" };

  return (
    <TouchableOpacity
      style={styles.heart}
      onPress={() => {
        nameShow = "heart-broken";
        setHeartToggle(!heartToggle);
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
