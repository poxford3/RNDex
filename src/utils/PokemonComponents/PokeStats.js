import React, { useContext } from "react";
import { View, Text } from "react-native";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function PokeStats({ stats }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <View>
      <VictoryChart domainPadding={10}>
        <VictoryGroup offset={20}>
          <VictoryBar
            data={stats}
            // domain={{ y: [0, 255] }}
            horizontal={true}
            labels={({ datum }) => datum.y}
            alignment="middle"
            style={{
              data: {
                fill: "blue",
              },
              labels: {
                fill: activeColors.textColor,
              },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}
