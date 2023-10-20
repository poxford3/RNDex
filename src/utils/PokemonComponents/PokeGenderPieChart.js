import React from "react";
import { Svg } from "react-native-svg";
import { VictoryPie, VictoryLabel } from "victory-native";

export default function PokeGenderPieChart({ genders, typeColor }) {
  const SIZE = 150;
  const CENTER = SIZE / 2;
  const INNER_RADIUS = SIZE * 0.3;
  // const INNER_RADIUS = 10;
  const dispText = `F: ${genders[1].y}% M: ${genders[0].y}%`;
  return (
    <Svg width={SIZE} height={SIZE}>
      <VictoryPie
        standalone={false}
        data={genders}
        width={SIZE}
        height={SIZE}
        innerRadius={INNER_RADIUS}
        colorScale={["blue", "pink"]}
        labels={({}) => null}
      />
      <VictoryLabel
        text={dispText}
        textAnchor={"middle"}
        style={{ fontSize: 16, fill: typeColor }}
        x={CENTER}
        y={SIZE - 20}
      />
    </Svg>
  );
}
