import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import PullTab from "../utils/PullTab";
import ModalCloseButton from "../utils/ModalCloseButton";
import AppearanceSetting from "../utils/SettingsComponents/AppearanceSetting";
import PokeIconSetting from "../utils/SettingsComponents/PokeIconSetting";
import InfoSetting from "../utils/SettingsComponents/InfoSetting";

export default function Settings({ navigation }) {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <PullTab />
      <ModalCloseButton navigation={navigation} />
      <View style={[styles.body, { backgroundColor: activeColors.background }]}>
        <AppearanceSetting />
        <PokeIconSetting pokeID={4} />
        <InfoSetting />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
