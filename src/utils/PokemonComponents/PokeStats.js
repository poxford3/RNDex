import React, { useContext } from "react";
import { View, Text } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";
import themeColors from "../../styles/themeColors";
import CustomDivider from "../CustomDivider";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function PokeStats({ stats, typeColor }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          color: activeColors.textColor,
        }}
      >
        Stats
      </Text>
      <CustomDivider direction={"horizontal"} />
      <View>
        <VictoryChart
          domainPadding={10}
          padding={{ left: 60, top: 30, right: 30, bottom: 60 }}
        >
          <VictoryAxis
            dependentAxis
            label={"(Max 255)"}
            orientation={"bottom"}
            domain={[0, 255]}
            style={{
              axis: {
                stroke: activeColors.textColor,
              },
              axisLabel: {
                fill: activeColors.textColor,
                marginTop: 5,
              },
              label: {
                fill: activeColors.textColor,
              },
              tickLabels: {
                fill: activeColors.textColor,
              },
            }}
          />
          <VictoryAxis
            independentAxis
            orientation={"left"}
            style={{
              axis: {
                stroke: activeColors.textColor,
              },
              tickLabels: {
                fill: activeColors.textColor,
              },
            }}
          />
          <VictoryBar
            data={stats}
            // domain={{ y: [0, 255] }}
            horizontal={true}
            labels={({ datum }) => datum.y}
            alignment="middle"
            style={{
              data: {
                fill: typeColor,
              },
              labels: {
                fill: activeColors.textColor,
                width: 50,
              },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
}
