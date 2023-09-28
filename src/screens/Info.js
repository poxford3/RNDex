import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";

export default function Info() {
  // https://pokeapi.co/
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={{ fontSize: 26, textAlign: "center" }}>
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
        <Text style={{ textAlign: "center", fontSize: 26 }}>
          {"\n\n\n"}The intent of this app is to practice React Native API calls
          to create a seemless tool.
        </Text>
        <TouchableOpacity style={{ marginTop: 30 }}>
          <Text>To view a list of all the generations, click here</Text>
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
});
