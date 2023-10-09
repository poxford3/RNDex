import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import capitalizeString from "../../hooks/capitalizeString";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PokeGenderPie from "./PokeGenderPie";

export default function PokeBonusInfo({ fullData, typeColor }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [loading, setLoading] = useState(true);

  // info:
  // height it 1/10th of a meter
  // weight is 1/10th of a kg
  // gender rate is chance of being female in 1/8ths, -1 == genderless

  // console.log("bonus", Object.keys(fullData));
  // console.log(fullData.weight);

  const AbilityDisplay = () => {
    const ability_length = fullData.abilities.length;
    if (ability_length > 1) {
      return (
        <View style={styles.sectional}>
          <Text style={[styles.headerText, { color: typeColor }]}>
            Abilities
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {fullData.abilities.map((ab, idx) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginVertical: 5,
                  }}
                  key={idx}
                >
                  <Text
                    style={[styles.infoText, { color: activeColors.textColor }]}
                  >
                    {capitalizeString(ab.ability.name)}{" "}
                  </Text>
                  {ab.is_hidden ? (
                    <Ionicons
                      name="eye-off-outline"
                      color={typeColor}
                      size={20}
                    />
                  ) : null}
                </View>
              );
            })}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.sectional}>
          <Text style={[styles.headerText, { color: typeColor }]}>Ability</Text>
          <Text style={[styles.infoText, { color: activeColors.textColor }]}>
            {capitalizeString(fullData.abilities[0].ability.name)}
          </Text>
        </View>
      );
    }
  };

  const QuickInfo = () => {
    return (
      <View style={styles.sectional}>
        <Text style={[styles.headerText, { color: typeColor }]}>IDK :/</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="ruler" size={20} color={typeColor} />
          <Text style={[styles.infoText, { color: activeColors.textColor }]}>
            {fullData.height / 10} m
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="scale-bathroom"
            size={20}
            color={typeColor}
          />
          <Text style={[styles.infoText, { color: activeColors.textColor }]}>
            {fullData.weight / 10} kg
          </Text>
        </View>
        <Text style={[styles.infoText, { color: activeColors.textColor }]}>
          Growth Rate: {capitalizeString(fullData.growth_rate.name)}
        </Text>
      </View>
    );
  };

  const StyledBody = () => {
    return (
      <View style={styles.styleBody}>
        <View style={styles.firstSection}>
          <AbilityDisplay />
          <QuickInfo />
          <PokeGenderPie genders={fullData.gender_rate} typeColor={typeColor} />
        </View>
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
    textAlign: "center",
  },
  firstSection: {
    // flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: 20,
    // textTransform: "capitalize",
  },
  sectional: {
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 20,
    margin: 5,
    // width: "50%",
  },
  styleBody: {
    padding: 20,
    // width: "50%",
    // width: "100%",
  },
});
