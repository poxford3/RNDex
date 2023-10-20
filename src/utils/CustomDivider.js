import React from "react";
import { View, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export default function CustomDivider({ direction }) {
  if (direction == "vertical") {
    return (
      <View
        style={{
          height: "100%",
          width: 1,
          backgroundColor: "#909090",
        }}
      ></View>
    );
  } else if (direction == "horizontal") {
    return (
      <View
        style={{
          // width: width,
          width: "100%",
          // width: 100,
          borderWidth: 1,
          borderColor: "#909090",
          marginVertical: 5,
        }}
      ></View>
    );
  }
}
