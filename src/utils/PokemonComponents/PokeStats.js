import React, { useContext } from "react";
import { View, Text, Dimensions } from "react-native";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
// https://formidable.com/open-source/victory/docs/victory-bar <- actually good documentation

const screenWidth = Dimensions.get("window").width;

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
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          color: activeColors.textColor,
        }}
      >
        (Total: {stats[0]["y"]})
      </Text>
      <View style={{ width: "auto" }}>
        <VictoryChart
          domainPadding={10}
          padding={{ left: 70, top: 30, right: 30, bottom: 60 }}
          width={screenWidth}
        >
          <VictoryAxis
            dependentAxis
            label={"(Single Value Max: 255)"}
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
            data={stats.filter((e) => e.x != "Total")}
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
