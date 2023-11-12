import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function PullTab() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];
  return (
    <View style={styles.pullCont}>
      <View
        style={[styles.pullTab, { backgroundColor: activeColors.textColor }]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  pullCont: {
    width: "100%",
    alignItems: "center",
  },
  pullTab: {
    height: 5,
    width: 40,
    borderRadius: 10,
    marginTop: 10,
  },
});
