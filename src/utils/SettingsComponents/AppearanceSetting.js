import { useContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import appearance from "../../styles/appearance";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function AppearanceSetting() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const LightingSetting = ({ appearanceName, active }) => {
    const imgBkg = active ? "blue" : activeColors.oppositeBkg;

    return (
      <TouchableOpacity
        onPress={() => {
          if (appearanceName == "system") {
            updateTheme({ system: true });
          } else {
            updateTheme({ mode: appearanceName });
          }
        }}
        style={styles.toggleBox}
      >
        <Image
          source={appearance[appearanceName]}
          style={[styles.selectionImg, { borderColor: imgBkg }]}
        />
        <Text
          style={{
            color: activeColors.textColor,
            textTransform: "capitalize",
            marginVertical: 5,
          }}
        >
          {appearanceName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={[styles.headerText, { color: activeColors.textColor }]}>
        Appearance
      </Text>
      <View style={styles.boxCont}>
        <View style={styles.boxList}>
          <LightingSetting
            appearanceName={"light"}
            active={theme.mode === "light" && !theme.system}
          />
          <LightingSetting
            appearanceName={"dark"}
            active={theme.mode === "dark" && !theme.system}
          />
          <LightingSetting appearanceName={"system"} active={theme.system} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxCont: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
  },
  boxList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    fontSize: 30,
    marginBottom: 10,
  },

  toggleBox: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  selectionImg: {
    height: 87,
    width: 110,
    borderWidth: 3,
    borderRadius: 20,
  },
});
