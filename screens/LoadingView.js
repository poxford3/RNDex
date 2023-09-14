import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function LoadingView() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
