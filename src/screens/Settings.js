import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "react-native-paper";
import theme from "../styles/theme";
import appearance from "../styles/appearance";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Settings() {
  const mode = useContext(ThemeContext);
  const updateTheme = useContext(ThemeContext).updateTheme;
  let activeColors = theme[mode.theme];

  const LightingSetting = ({ appearanceName, active }) => {
    const imgBkg = active ? "blue" : activeColors.oppositeBkg;
    return (
      <TouchableOpacity
        onPress={() => {
          updateTheme(appearanceName);
        }}
        style={styles.toggleBox}
      >
        <Image
          source={appearance[appearanceName]}
          style={[styles.selectionImg, { borderColor: imgBkg }]}
        />
        {/* <View style={styles.lowerOption}> */}
        <Text
          style={{
            color: activeColors.textColor,
            textTransform: "capitalize",
            marginVertical: 5,
          }}
        >
          {appearanceName}
        </Text>
        {/* <Checkbox
          status={active ? "checked" : "unchecked"}
          color={activeColors.textColor}
        /> */}
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Text
        style={{
          fontSize: 30,
          color: activeColors.textColor,
          marginBottom: 10,
        }}
      >
        Appearance
      </Text>
      <View style={styles.boxCont}>
        <View style={styles.boxList}>
          <LightingSetting
            appearanceName={"light"}
            active={mode.theme === "light"}
          />
          <LightingSetting
            appearanceName={"dark"}
            active={mode.theme === "dark"}
          />
          <LightingSetting appearanceName={"system"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxCont: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerOption: {
    flexDirection: "row",
  },
  toggleBox: {
    marginHorizontal: 5,
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
    height: 87,
    width: 110,
    borderWidth: 5,
    borderRadius: 20,
  },
});
