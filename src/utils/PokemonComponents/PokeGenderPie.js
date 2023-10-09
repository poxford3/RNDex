import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg } from "react-native-svg";
import { VictoryPie, VictoryLabel } from "victory-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function PokeGenderPie({ genders, typeColor }) {
  // console.log(genders);
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [genderObj, setGenderObj] = useState([
    {
      x: "male",
      y: 0,
    },
    {
      x: "female",
      y: 0,
    },
  ]);
  const [genderless, setGenderless] = useState(false);

  const genderChance = () => {
    if (genders == -1) {
      setGenderless(true);
    } else {
      setGenderless(false);
      const fem_chance = (genders * 1) / 8;
      const male_chance = Math.abs(fem_chance - 1);
      setGenderObj([
        { x: "male", y: male_chance * 100 },
        { x: "female", y: fem_chance * 100 },
      ]);
    }
  };

  useEffect(() => {
    genderChance();
  }, []);

  const SIZE = 200;
  const CENTER = SIZE / 2;
  const INNER_RADIUS = 60;
  const dispText = `Female: ${genderObj[1].y}%\nMale ${genderObj[0].y}%`;

  return genderless ? (
    <View style={styles.sectional}>
      <Text style={[styles.headerText, { color: typeColor }]}>
        Gender Rates
      </Text>
      <Svg width={SIZE} height={SIZE}>
        <VictoryPie
          standalone={false}
          data={[{ x: 1, y: 1 }]}
          width={SIZE}
          height={SIZE}
          innerRadius={INNER_RADIUS}
          colorScale={["lightgrey"]}
          labels={({}) => null}
        />
        <VictoryLabel
          text={"Genderless"}
          textAnchor={"middle"}
          style={{ fontSize: 16, fill: activeColors.textColor }}
          x={CENTER}
          y={CENTER}
        />
      </Svg>
    </View>
  ) : (
    <View style={styles.sectional}>
      <Text style={[styles.headerText, { color: typeColor }]}>
        Gender Rates
      </Text>
      <Svg width={SIZE} height={SIZE}>
        <VictoryPie
          standalone={false}
          data={genderObj}
          width={SIZE}
          height={SIZE}
          innerRadius={INNER_RADIUS}
          colorScale={["blue", "pink"]}
          labels={({}) => null}
        />
        <VictoryLabel
          text={dispText}
          textAnchor={"middle"}
          style={{ fontSize: 16, fill: activeColors.textColor }}
          x={CENTER}
          y={CENTER}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  sectional: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 20,
    margin: 5,
    // width: "50%",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
