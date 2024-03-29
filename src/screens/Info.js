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
  Platform,
} from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import CustomDivider from "../utils/CustomDivider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenWidth = Dimensions.get("window").width;
// const screenHeight = Dimensions.get("window").height;

export default function Info({ navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // const [_screenHeight, setScreenHeight] = useState(0);

  const boxTexts = [
    {
      key: 1,
      header: "Natures",
      body: "Tap here to view a chart of how each nature affects your Pokémon!",
      disabled: false,
      destination: "Natures",
      img: require("../../assets/info_imgs/poke_leaf.png"),
    },
    // {
    //   // TODO fix meee!!!
    //   header: "Matchup Chart",
    //   body: "Tap here to view a chart of how type fairs against another!",
    //   disabled: false,
    //   destination: "MatchupChart",
    // },
    {
      key: 2,
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
      key: 3,
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
      key: 4,
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
      key: 5,
      header: "Source of Data",
      body: `This app uses the PokéAPI tool for its data ingestion (linked below).${"\n\n"}Note that not all data may be shown as it is in game. Check back periodically to see if the information/Pokémon you're looking for is updated.`,
      disabled: true,
      destination: "Info",
      img: require("../../assets/info_imgs/poke_about.png"),
    },
    {
      key: 6,
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
      <ScrollView>
        <View style={styles.body}>
          {boxTexts.map((box) => {
            return (
              <PokeInfoObj
                key={box.key}
                headerText={box.header}
                bodyText={box.body}
                disabled={box.disabled}
                destination={box.destination}
                list_data={box.list_data}
                img={box.img}
              />
            );
          })}
          <View
            style={{
              flexDirection: "row",
              justifyContent: Platform.OS == "ios" ? "space-between" : "center",
              width: "100%",
            }}
          >
            {Platform.OS == "ios" ? (
              <Text
                onPress={() => {
                  Linking.openURL(
                    "https://www.apple.com/legal/internet-services/terms/site.html"
                  );
                }}
                style={{ color: activeColors.link, fontSize: 22 }}
              >
                Terms of Use
              </Text>
            ) : null}
            <Text
              onPress={() => {
                Linking.openURL("https://pokeapi.co/");
              }}
              style={{ color: activeColors.link, fontSize: 22 }}
            >
              PokeAPI
            </Text>
          </View>
          <CustomDivider direction={"horizontal"} />
          <View style={styles.links}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://twitter.com/rndex_app");
              }}
            >
              <MaterialCommunityIcons
                name="twitter"
                color={activeColors.textColor}
                size={32}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://github.com/poxford3/rndex");
              }}
            >
              <MaterialCommunityIcons
                name="github"
                color={activeColors.textColor}
                size={32}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 10,
    // width: "100%",
    flex: 1,
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
  links: {
    flexDirection: "row",
    alignItems: "center",
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
