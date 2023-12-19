import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

export default function AllLocations() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AllLocations</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
