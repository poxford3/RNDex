import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import CustomDivider from "../utils/CustomDivider";

export default function Info({ navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

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
        <PokeInfoObj
          headerText={"Source of Data"}
          bodyText={
            "This app uses the PokeAPI tool linked here for its data ingestion (linked below)"
          }
        />
        <PokeInfoObj
          headerText={"About"}
          bodyText={`This app is written by a sole developer with the intent to show Pokémon information in a useful and educational purpose.${"\n\n"}This app is not associated with Nintendo/Game Freak/The Pokémon Company. Some of the assets in the app are copyighted and are accessed under Fair Use. No copyright infringement intended.`}
        />
        <Text style={[styles.mostText, { color: activeColors.textColor }]}>
          This app uses the PokeAPI tool linked here for its data ingestion:
          {"\n"}
        </Text>
        <Text
          onPress={() => {
            Linking.openURL("https://pokeapi.co/");
          }}
          style={{ color: "blue", fontSize: 24 }}
        >
          PokeAPI
        </Text>
        <Text style={[styles.mostText, { color: activeColors.textColor }]}>
          {"\n"}The intent of this app is to practice React Native API calls to
          create a seemless tool.
        </Text>
        <CustomDivider direction={"horizontal"} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Favorites");
          }}
          style={styles.genSelect}
        >
          <Text style={styles.mostText}>
            To view a list of all favorites, click here
          </Text>
        </TouchableOpacity>
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
    width: "100%",
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
