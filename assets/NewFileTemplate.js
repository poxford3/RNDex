import React, { useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

export default function FileName() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FileName</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
