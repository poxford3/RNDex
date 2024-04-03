import React, { useContext } from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Tooltip } from "react-native-elements";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function TooltipInfo({ tip }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <View style={{ paddingHorizontal: 2 }}>
      <Tooltip
        popover={<Text style={{ color: activeColors.textColor }}>{tip}</Text>}
        overlayColor={"rgba(100, 100, 100, 0.70)"}
        height={null}
        width={175} // <- this is bullshit that I have to do this
      >
        <MaterialCommunityIcons name="information" size={20} color={"grey"} />
      </Tooltip>
    </View>
  );
}
