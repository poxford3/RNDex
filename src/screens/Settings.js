import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "../styles/theme";
import appearance from "../styles/appearance";
import types from "../../assets/types";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Settings() {
  const mode = useContext(ThemeContext);
  const updateTheme = useContext(ThemeContext).updateTheme;
  let activeColors = theme[mode.theme];

  console.log(appearance);

  const handleChange = () => {
    updateTheme();
  };

  const LightingSetting = ({ lightingType, background, appearanceName }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleChange();
        }}
        style={[styles.toggleBox, { backgroundColor: background }]}
      >
        <Image
          source={appearance[appearanceName]}
          style={styles.selectionImg}
        />
        <Text
          style={{ color: activeColors.textColor, textTransform: "capitalize" }}
        >
          {appearanceName}
        </Text>
        <Text>{lightingType}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {/* <View style={styles.toggleBoxList}> */}
      <Text style={{ color: activeColors.textColor }}>Settings</Text>
      <Text style={{ fontSize: 30, color: activeColors.textColor }}>
        Appearance
      </Text>
      <LightingSetting appearanceName={"system"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleBox: {
    height: 200,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  systemBox: {
    width: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "grey",
    borderTopColor: "black",
    borderTopWidth: 40,
    borderRightColor: "white",
    borderRightWidth: 300,
    // position: "absolute",
    // opacity: 0.5,
  },
  selectionImg: {
    height: 100,
    width: 100,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
  },
});
