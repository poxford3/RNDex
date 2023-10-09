import React, { useContext } from "react";
import { View, Text } from "react-native";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
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
        <VictoryChart domainPadding={10}>
          <VictoryGroup
            offset={20}
            theme={{
              axis: {
                axisLabel: {
                  fill: "white",
                },
              },
            }}
          >
            <VictoryBar
              data={stats}
              domain={{ y: [0, 255] }}
              horizontal={true}
              theme={{
                axis: {
                  axisLabel: {
                    fill: "white",
                  },
                },
              }}
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
          </VictoryGroup>
        </VictoryChart>
      </View>
    </View>
  );
}
