import React from "react";
import {
  View,
  // Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Text, Divider } from "react-native-paper";

export default function Info({ navigation }) {
  // https://pokeapi.co/
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.mostText}>
          This app uses the PokeAPI tool linked here:{"\n"}
        </Text>
        <Text
          onPress={() => {
            Linking.openURL("https://pokeapi.co/");
          }}
          style={{ color: "blue", fontSize: 26 }}
        >
          PokeAPI
        </Text>
        <Text style={styles.mostText}>
          {"\n\n\n"}The intent of this app is to practice React Native API calls
          to create a seemless tool.
        </Text>
        <Divider bold={true} />
        {/* <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#909090",
            marginTop: 20,
          }}
        ></View> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Gens");
          }}
          style={styles.genSelect}
        >
          <Text style={styles.mostText}>
            To view a list of all the generations, click here
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
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
