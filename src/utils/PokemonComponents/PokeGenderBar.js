import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function PokeGenderBar({ genders }) {
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

  let male_bar, female_bar;
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

      if (genderObj[0].y == 100) {
        male_bar = {
          width: genderObj[0].y * 2,
          backgroundColor: "rgb(51, 85, 255)",
          borderRadius: 30,
        };
      } else {
        male_bar = {
          width: genderObj[0].y * 2,
          backgroundColor: "rgb(51, 85, 255)",
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
        };
      }
    }
  };

  useEffect(() => {
    genderChance();
  }, []);

  return (
    <View>
      {!genderless ? (
        <View>
          <View
            style={[styles.container, { borderColor: activeColors.textColor }]}
          >
            <View // male
              style={[
                styles.gender,
                {
                  width: genderObj[0].y * 2,
                  backgroundColor: "rgb(51, 85, 255)",
                  borderRadius: 30 * (genderObj[0].y == 100), // set an overall border radius if the bar is 100% of 1 gender
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                },
              ]}
            ></View>
            <View // female
              style={[
                styles.gender,
                {
                  width: genderObj[1].y * 2,
                  backgroundColor: "rgb(255, 119, 221)",
                  borderRadius: 30 * (genderObj[1].y == 100),
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                },
              ]}
            ></View>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: activeColors.textColor,
              marginTop: 5,
            }}
          >
            Male: {genderObj[0].y}%, Female: {genderObj[1].y}%
          </Text>
        </View>
      ) : (
        <View>
          <View style={[styles.container, { borderColor: "grey" }]}>
            <View
              style={[
                styles.gender,
                {
                  width: 200,
                  backgroundColor: "grey",
                  borderRadius: 30,
                },
              ]}
            ></View>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: activeColors.textColor,
              marginTop: 5,
            }}
          >
            Genderless
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 1,
  },
  gender: {
    height: 15,
  },
});
