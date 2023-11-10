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
  // https://pokeapi.co/
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.body}>
        <Text style={[styles.mostText, { color: activeColors.textColor }]}>
          This app uses the PokeAPI tool linked here for its data ingestion:
          {"\n"}
        </Text>
        <Text
          onPress={() => {
            Linking.openURL("https://pokeapi.co/");
          }}
          style={{ color: "blue", fontSize: 26 }}
        >
          PokeAPI
        </Text>
        <Text style={[styles.mostText, { color: activeColors.textColor }]}>
          {"\n"}The intent of this app is to practice React Native API calls to
          create a seemless tool.
        </Text>
        <CustomDivider direction={"horizontal"} />
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("Gens");
          }}
          style={styles.genSelect}
        >
          <Text style={styles.mostText}>
            To view a list of all the generations, click here
          </Text>
        </TouchableOpacity> */}
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
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  genSelect: {
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: "lightgrey",
    padding: 10,
  },
  mostText: {
    textAlign: "center",
    fontSize: 26,
  },
});
