import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import CustomDivider from "../utils/CustomDivider";

const screenWidth = Dimensions.get("window").width;

export default function Info({ navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  boxTexts = [
    {
      header: "Source of Data",
      body: "This app uses the PokeAPI tool linked here for its data ingestion (linked below)",
    },
    {
      header: "About",
      body: `This app is written by a sole developer with the intent to show Pokémon information in a useful and educational purpose.${"\n\n"}This app is not associated with Nintendo/Game Freak/The Pokémon Company. Some of the assets in the app are copyighted and are accessed under Fair Use. No copyright infringement intended.`,
    },
  ];

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
      <View style={styles.body}>
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
        {boxTexts.map((box, idx) => {
          return (
            <PokeInfoObj
              key={idx}
              headerText={box.header}
              bodyText={box.body}
            />
          );
        })}
        <CustomDivider direction={"horizontal"} />
        <Text
          onPress={() => {
            Linking.openURL("https://pokeapi.co/");
          }}
          style={{ color: "blue", fontSize: 24 }}
        >
          PokeAPI
        </Text>
      </View>
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
