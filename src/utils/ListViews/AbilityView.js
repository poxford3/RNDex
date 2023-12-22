import React, { useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import AbilityDetails from "../AbilityDetails";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function AbilityView({ route }) {
  const list_data = route.params.route;
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <AbilityDetails
        route={{
          params: {
            id: list_data.url.split("/")[6],
            mainColor: activeColors.textColor,
            is_hidden: false,
            modal: false,
          },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
