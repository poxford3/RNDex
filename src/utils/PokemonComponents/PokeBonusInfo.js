import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import capitalizeString from "../../hooks/capitalizeString";
import TypeEffectiveness from "../../hooks/TypeEffectiveness";
import images from "../../../assets/types";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PokeGenderPie from "./PokeGenderPie";

export default function PokeBonusInfo({ fullData, typeColor, types }) {
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

  const TypeEffectiveBody = () => {
    // console.log("types", capitalizeString(types.type1));
    if (types.type1 != null) {
      // console.log("made it in");
      const type2 = types.type2 ? capitalizeString(types.type2) : "None";
      const ability_name = capitalizeString(fullData.abilities[0].ability.name);
      const type_array = [capitalizeString(types.type1), type2];
      const typeEffectObj = TypeEffectiveness(type_array, ability_name);
      return (
        <View style={styles.sectional}>
          <Text style={[styles.headerText, { color: typeColor }]}>
            Type Matchups
          </Text>
          <Text>VS</Text>
          {typeEffectObj
            .filter((e) => e.effectiveness != 1)
            .map((t, idx) => {
              return (
                <View style={{ flexDirection: "row" }} key={idx}>
                  <Image
                    style={{ height: 20, width: 60 }}
                    source={images[t.typeName.toLowerCase()]}
                  />
                  <Text style={{ color: t.color }}>
                    {"  "}
                    {t.effectiveness}x
                  </Text>
                </View>
              );
            })}
          {/* <Text>Weak Against</Text>
          {typeEffectObj
            .filter((e) => e.effectiveness > 1)
            .map((t, idx) => {
              return (
                <Text key={idx}>
                  {t.typeName}: {t.effectiveness}x
                </Text>
              );
            })}
          <Text>Immune To</Text>
          {typeEffectObj
            .filter((e) => e.effectiveness == 0)
            .map((t, idx) => {
              return (
                <Text key={idx}>
                  {t.typeName}: {t.effectiveness}x
                </Text>
              );
            })} */}
        </View>
      );
    } else {
      return (
        <View style={styles.sectional}>
          <Text style={[styles.headerText, { color: typeColor }]}>
            Type Matchups L
          </Text>
        </View>
      );
    }
  };

  const StyledBody = () => {
    return (
      <View style={styles.styleBody}>
        <View style={styles.firstSection}>
          <AbilityDisplay />
          <PokeGenderPie genders={fullData.gender_rate} typeColor={typeColor} />
          <TypeEffectiveBody />
          <QuickInfo />
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
    backgroundColor: "#999999",
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
