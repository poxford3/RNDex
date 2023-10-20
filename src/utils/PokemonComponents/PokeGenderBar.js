import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

export default function PokeGenderBar() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>PokeGenderBar</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
