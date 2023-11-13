import React, { memo, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import images from "../../assets/types";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export const Move = memo(function Move({ item, navigation, mainColor }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  let left_box_text =
    item.level_learned > 0
      ? "Lv " + item.level_learned
      : item.mach_name
      ? item.mach_name
      : "-";

  return (
    <TouchableOpacity
      style={styles.moveBox}
      onPress={() => {
        navigation.navigate("MoveDetails", {
          move: item,
          mainColor: mainColor,
        });
      }}
    >
      <View style={styles.move}>
        <View style={[styles.box, { width: "12%", maxWidth: 50 }]}>
          <Text style={{ textAlign: "center" }}>{left_box_text} </Text>
        </View>
        <View style={styles.nameBox}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 20, color: activeColors.textColor }}
          >
            {item.move_name}
          </Text>
          <View style={styles.miniImgContainer}>
            <Image style={styles.miniImg} source={images[item.type]} />
            <Image style={styles.miniImg} source={images[item.damageClass]} />
          </View>
        </View>
        <View style={styles.rightSide}>
          <View style={styles.box}>
            <Text style={{ textAlign: "center" }}>{item.power}</Text>
          </View>
          <View style={styles.box}>
            <Text style={{ textAlign: "center" }}>{item.accuracy}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  box: {
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 40,
  },
  miniImg: {
    marginRight: 5,
    marginLeft: 2,
  },
  miniImgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  move: {
    flexDirection: "row",
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  moveBox: {
    width: "100%",
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  nameBox: {
    alignItems: "flex-start",
    width: "58%",
    marginLeft: 10,
  },
  rightSide: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
