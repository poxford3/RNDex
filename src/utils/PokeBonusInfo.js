import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PokemonContext } from "../contexts/PokemonContext";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function PokeBonusInfo({ fullData }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // info:
  // height it 1/10th of a meter
  // weight is 1/10th of a kg
  // gender rate is chance of being female in 1/8ths, -1 == genderless

  // console.log("bonus", Object.keys(fullData));
  // console.log(fullData.weight);

  const genderChance = () => {
    if (fullData.gender_rate == -1) {
      return "Genderless";
    } else {
      const fem_chance = (fullData.gender_rate * 1) / 8;
      const male_chance = Math.abs(fem_chance - 1);
      return `Female: ${fem_chance * 100}% / Male: ${male_chance * 100}%`;
    }
  };

  const RawNumbersBody = () => {
    return (
      <View>
        <Text style={{ color: "white" }}>{fullData.weight / 10} kg</Text>
        <Text style={{ color: "white" }}>{fullData.height / 10} m</Text>
        {fullData.abilities.map((ab, idx) => {
          return (
            <Text
              style={{ color: "white", textTransform: "capitalize" }}
              key={idx}
            >
              {ab.ability.name}
            </Text>
          );
        })}
        <Text style={{ color: "white" }}>{genderChance()}</Text>
        {fullData.is_legendary ? (
          <Text style={{ color: "white" }}>Legendary :O</Text>
        ) : (
          <></>
        )}
        {fullData.is_mythical ? (
          <Text style={{ color: "white" }}>Mythical :O</Text>
        ) : (
          <></>
        )}
      </View>
    );
  };

  const AbilityDisplay = () => {
    if (fullData.abilities.length > 1) {
      return (
        <View style={styles.sectional}>
          <Text style={[styles.headerText, { color: activeColors.textColor }]}>
            Abilities
          </Text>
          {fullData.abilities.map((ab, idx) => {
            return (
              <Text
                key={idx}
                style={[styles.infoText, { color: activeColors.textColor }]}
              >
                {ab.ability.name} {ab.is_hidden ? `(Hidden)` : ""}
              </Text>
            );
          })}
        </View>
      );
    }
  };

  const StyledBody = () => {
    return (
      <View style={styles.styleBody}>
        <AbilityDisplay />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StyledBody />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  infoText: {
    textTransform: "capitalize",
  },
  sectional: {
    backgroundColor: "grey",
  },
  styleBody: {
    padding: 20,
    width: "100%",
  },
});
