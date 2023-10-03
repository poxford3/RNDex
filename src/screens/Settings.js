import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import themeColors from "../styles/themeColors";
import appearance from "../styles/appearance";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Settings() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const LightingSetting = ({ appearanceName, active }) => {
    const imgBkg = active ? "blue" : activeColors.oppositeBkg;

    return (
      <TouchableOpacity
        onPress={() => {
          if (appearanceName == "system") {
            updateTheme({ system: true });
          } else {
            updateTheme({ mode: appearanceName });
          }
        }}
        style={styles.toggleBox}
      >
        <Image
          source={appearance[appearanceName]}
          style={[styles.selectionImg, { borderColor: imgBkg }]}
        />
        <Text
          style={{
            color: activeColors.textColor,
            textTransform: "capitalize",
            marginVertical: 5,
          }}
        >
          {appearanceName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View
        style={[styles.pullTab, { backgroundColor: activeColors.textColor }]}
      ></View>
      <View style={[styles.body, { backgroundColor: activeColors.background }]}>
        <Text
          style={{
            fontSize: 30,
            color: activeColors.textColor,
            marginBottom: 10,
          }}
        >
          Appearance
        </Text>
        <View style={styles.boxCont}>
          <View style={styles.boxList}>
            <LightingSetting
              appearanceName={"light"}
              active={theme.mode === "light" && !theme.system}
            />
            <LightingSetting
              appearanceName={"dark"}
              active={theme.mode === "dark" && !theme.system}
            />
            <LightingSetting appearanceName={"system"} active={theme.system} />
            {/* need to implement the system theme... */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  boxCont: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  boxList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  lowerOption: {
    flexDirection: "row",
  },
  pullTab: {
    height: 5,
    width: 40,
    borderRadius: 10,
    margin: 10,
  },
  toggleBox: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  systemBox: {
    width: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "grey",
    borderTopColor: "black",
    borderTopWidth: 40,
    borderRightColor: "white",
    borderRightWidth: 300,
    // position: "absolute",
    // opacity: 0.5,
  },
  selectionImg: {
    height: 87,
    width: 110,
    borderWidth: 3,
    borderRadius: 20,
  },
});
