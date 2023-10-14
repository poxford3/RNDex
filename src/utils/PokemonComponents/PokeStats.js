import React, { useContext } from "react";
import { View, Text } from "react-native";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import themeColors from "../../styles/themeColors";
import CustomDivider from "../CustomDivider";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function PokeStats({ stats, typeColor }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  return (
    <View
    // style={{ width: "80%", alignItems: "center", justifyContent: "center" }}
    // style={{ width: "80%" }}
    >
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
              },
              tickLabels: {
                fill: activeColors.textColor,
              },
              axisLabel: {
                marginTop: 5,
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
          {/* <VictoryLabel
            text={"Max 255"}
            textAnchor={"middle"}
            style={{
              fill: "white",
            }}
          /> */}
        </VictoryChart>
      </View>
    </View>
  );
}
