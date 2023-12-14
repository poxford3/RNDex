import { useContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function InfoSetting() {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => {
        navigation.goBack();
        navigation.navigate("Information");
      }}
    >
      <Text style={[styles.headerText, { color: activeColors.textColor }]}>
        Information and Charts
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MaterialCommunityIcons
          name="information"
          color={activeColors.textColor}
          size={32}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    marginBottom: 10,
  },
  toggleBox: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionIcon: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "grey",
  },
});
