import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function LoadingView() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <View style={styles.loading}>
      <ActivityIndicator
        size="large"
        animating={true}
        style={{ padding: 10 }}
        color={activeColors.accent}
      />
      <Text style={{ color: activeColors.textColor }}>Loading...</Text>
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
