import React, { useContext, useState } from "react";
import {
  View,
  Text,
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
const screenHeight = Dimensions.get("window").height;

export default function Info({ navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [_screenHeight, setScreenHeight] = useState(0);

  boxTexts = [
    {
      header: "Source of Data",
      body: "This app uses the PokéAPI tool linked here for its data ingestion (linked below)",
    },
    {
      header: "About",
      body: `This app is written by a sole developer with the intent to show Pokémon information in a useful and educational purpose.${"\n\n"}This app is not associated with Nintendo/Game Freak/The Pokémon Company. Some of the assets in the app are copyighted and are accessed under Fair Use. No copyright infringement intended.`,
    },
  ];

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = _screenHeight > screenHeight;

  const PokeInfoObj = ({ headerText, bodyText }) => {
    return (
      <View style={styles.infoObj}>
        <View style={styles.objHeader}>
          <Text style={[styles.objHeadText, { color: activeColors.textColor }]}>
            {headerText}
          </Text>
        </View>
        <View
          style={[styles.objBody, { backgroundColor: activeColors.accent }]}
        >
          <Text style={[styles.objBodyText, { color: activeColors.textColor }]}>
            {bodyText}
          </Text>
        </View>
      </View>
    );
  };
  // https://pokeapi.co/
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.body}
        onContentSizeChange={onContentSizeChange}
        scrollEnabled={scrollEnabled}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Favorites");
          }}
        >
          <PokeInfoObj
            headerText={"Favorites"}
            bodyText={"Tap here to access your favorites list!"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("natures");
          }}
        >
          <PokeInfoObj
            headerText={"Natures"}
            bodyText={
              "Tap here to view a chart of how each nature affects your Pokémon!"
            }
          />
        </TouchableOpacity>
        {boxTexts.map((box, idx) => {
          return (
            <PokeInfoObj
              key={idx}
              headerText={box.header}
              bodyText={box.body}
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
  objHeader: {},
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
