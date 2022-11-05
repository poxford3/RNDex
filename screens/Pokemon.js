import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function Pokemon({ navigation, route }) {
  pokemonInfo = route.params;
  // will be view of once pokemon is clicked
  return (
    <SafeAreaView style={styles.container}>
      <Text>Pokemon</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
