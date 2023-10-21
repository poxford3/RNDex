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

  return (
    <View>
      {!genderless ? (
        <View>
          <View
            style={[
              styles.container,
              { borderColor: activeColors.textColor, borderWidth: 1 },
            ]}
          >
            <View
              style={[
                styles.gender,
                {
                  width: genderObj[0].y * 2,
                  backgroundColor: "rgb(51, 85, 255)",
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                },
              ]}
            ></View>
            <View
              style={[
                styles.gender,
                {
                  width: genderObj[1].y * 2,
                  backgroundColor: "rgb(255, 119, 221)",
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
          {/* <View
            style={[styles.container, { borderColor: "grey", borderWidth: 1 }]}
          >
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
          </View> */}
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
    borderRadius: 60,
  },
  gender: {
    height: 15,
  },
});
