import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import themeColors from "../styles/themeColors";
import appearance from "../styles/appearance";
import { ThemeContext } from "../contexts/ThemeContext";
import { SpriteContext } from "../contexts/SpriteContext";
import PullTab from "../utils/PullTab";
import ModalCloseButton from "../utils/ModalCloseButton";

export default function Settings({ navigation }) {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { sprites, updateSprites } = useContext(SpriteContext);

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

  const AppearanceSetting = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.headerText, { color: activeColors.textColor }]}>
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
          </View>
        </View>
      </View>
    );
  };

  const PokeIconSetting = () => {
    const pokemonImgID = 4;
    const classic_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemonImgID}.png`;
    const modern_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonImgID}.png`;
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.headerText, { color: activeColors.textColor }]}>
          Sprite Type
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={[styles.toggleBox, { borderColor: activeColors.border }]}
            onPress={() => {
              updateSprites("modern");
            }}
          >
            <Image
              style={[
                styles.selectionImg,
                {
                  borderColor:
                    sprites.type == "modern" ? "blue" : activeColors.border,
                },
              ]}
              source={{ uri: modern_url }}
            />
            <Text
              style={{
                color: activeColors.textColor,
                marginVertical: 5,
              }}
            >
              Modern
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleBox}
            onPress={() => {
              updateSprites("classic");
            }}
          >
            <Image
              style={[
                styles.selectionImg,
                {
                  borderColor:
                    sprites.type == "classic" ? "blue" : activeColors.border,
                  padding: 5,
                },
              ]}
              source={{ uri: classic_url }}
            />
            <Text
              style={{
                color: activeColors.textColor,
                marginVertical: 5,
              }}
            >
              Classic
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <PullTab />
      <ModalCloseButton navigation={navigation} />
      <View style={[styles.body, { backgroundColor: activeColors.background }]}>
        <AppearanceSetting />
        <PokeIconSetting />
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
  },
  headerText: {
    fontSize: 30,
    marginBottom: 10,
  },
  lowerOption: {
    flexDirection: "row",
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
  },
  selectionImg: {
    height: 87,
    width: 110,
    borderWidth: 3,
    borderRadius: 20,
  },
});
