import React, { useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function MissingFavorites() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Text
        style={{
          color: activeColors.textColor,
          fontSize: 24,
          textAlign: "center",
        }}
      >
        Tap the{" "}
        <MaterialCommunityIcons
          name="heart-outline"
          size={30}
          color={activeColors.grey}
        />{" "}
        when viewing Pokemon to start adding favorites here!
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
