import React from "react";
import { View } from "react-native";

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
          width: "100%",
          borderWidth: 1,
          borderColor: "#909090",
          marginTop: 10,
        }}
      ></View>
    );
  }
}
