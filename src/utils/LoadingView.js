import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import theme from "../styles/theme";
import { ThemeContext } from "../contexts/ThemeContext";

export default function LoadingView() {
  const mode = useContext(ThemeContext);
  let activeColors = theme[mode.theme];

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
