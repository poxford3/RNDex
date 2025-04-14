import React, { useContext } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function NetworkError() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons 
        name="globe-outline"
        size={30}
        color={activeColors.textColor}
      />
      <Text style={{ textAlign: "center", color: activeColors.textColor, fontWeight: 'bold', fontSize: 20 }}>
        Network error
      </Text>
      <Text style={{ textAlign: 'center', color: activeColors.textColor, fontSize: 14 }}>
        Ensure your internet is turned on, restart app, or check later if previous steps fail.
      </Text>
    </View>
  );
}