import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import CustomDivider from "../utils/CustomDivider";

const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;

export default function Info({ navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // const [_screenHeight, setScreenHeight] = useState(0);

  boxTexts = [
    {
      header: "Natures",
      body: "Tap here to view a chart of how each nature affects your Pokémon!",
      disabled: false,
      destination: "Natures",
      img: require("../../assets/info_imgs/poke_leaf.png"),
    },
    // { // TODO fix meee!!!
    //   header: "Matchup Chart",
    //   body: "Tap here to view a chart of how type fairs against another!",
    //   disabled: false,
    //   destination: "MatchupChart",
    // },
    {
      header: "Items",
      body: "Tap here to view a list of all items!",
      disabled: false,
      destination: "All Lists",
      list_data: {
        api_context: "item",
        title: "All Items",
        detailPage: "ItemView",
      },
      img: require("../../assets/info_imgs/poke-ball.png"),
    },
    {
      header: "Abilities",
      body: "Tap here to view a list of all abilities!",
      disabled: false,
      destination: "All Lists",
      list_data: {
        api_context: "ability",
        title: "Abilities",
        detailPage: "AbilityView",
      },
      img: require("../../assets/info_imgs/poke_star.png"),
    },
    {
      header: "Locations",
      body: "Tap here to view a list of all locations!",
      disabled: false,
      destination: "All Lists",
      list_data: {
        api_context: "location",
        title: "Location",
        detailPage: "LocationView",
      },
      img: require("../../assets/info_imgs/poke_map.png"),
    },
    {
      header: "Source of Data",
      body: "This app uses the PokéAPI tool for its data ingestion (linked below)",
      disabled: true,
      destination: "Info",
      img: require("../../assets/info_imgs/poke_about.png"),
    },
    {
      header: "About",
      body: `This app is written by a sole developer with the intent to show Pokémon information in a useful and educational purpose.${"\n\n"}This app is not associated with Nintendo/Game Freak/The Pokémon Company. Some of the assets in the app are copyighted and are accessed under Fair Use. No copyright infringement intended.`,
      disabled: true,
      destination: "Info",
      img: require("../../assets/info_imgs/poke_info.png"),
    },
  ];

  const PokeInfoObj = ({
    headerText,
    bodyText,
    disabled,
    destination,
    list_data,
    img,
  }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={styles.infoObj}
        onPress={() => {
          list_data
            ? navigation.navigate(destination, {
                list_data: list_data,
              })
            : navigation.navigate(destination);
        }}
      >
        <View style={styles.objHeader}>
          <Text style={[styles.objHeadText, { color: activeColors.textColor }]}>
            {headerText}
          </Text>
          <Image
            source={img}
            style={{ height: 40, width: 40, marginLeft: 5 }}
          />
        </View>
        <View
          style={[styles.objBody, { backgroundColor: activeColors.accent }]}
        >
          <Text style={[styles.objBodyText, { color: activeColors.textColor }]}>
            {bodyText}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  // https://pokeapi.co/
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          {boxTexts.map((box, idx) => {
            return (
              <PokeInfoObj
                key={idx}
                headerText={box.header}
                bodyText={box.body}
                disabled={box.disabled}
                destination={box.destination}
                list_data={box.list_data}
                img={box.img}
              />
            );
          })}
          <Text
            onPress={() => {
              Linking.openURL("https://pokeapi.co/");
            }}
            style={{ color: "blue", fontSize: 24 }}
          >
            PokeAPI
          </Text>
          <CustomDivider direction={"horizontal"} />
          <Text style={{ fontSize: 14, color: activeColors.textColor }}>
            RNDex is a nice app
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  infoObj: {
    marginBottom: 15,
    width: screenWidth,
    padding: 10,
  },
  objHeader: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
  },
  objHeadText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  objBody: {
    padding: 10,
    borderRadius: 10,
  },
  objBodyText: {
    fontSize: 20,
  },
});
