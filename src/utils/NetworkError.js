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
      <Text style={{ textAlign: "center", color: activeColors.textColor }}>
        Network error, restart to attempt to fix
      </Text>
    </View>
  );
}