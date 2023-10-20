import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import capitalizeString from "../../hooks/capitalizeString";
import TypeEffectiveness from "../../hooks/TypeEffectiveness";
import images from "../../../assets/types";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PokeGenderPie from "./PokeGenderPie";
import LoadingView from "../LoadingView";

const { height, width } = Dimensions.get("screen");

export default function PokeBonusInfo({ fullData, typeColor, types }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // info:
  // height it 1/10th of a meter
  // weight is 1/10th of a kg
  // gender rate is chance of being female in 1/8ths, -1 == genderless

  // console.log("bonus", Object.keys(fullData));
  // console.log(fullData.weight);

  const AbilityDisplay = () => {
    return (
      <View style={{ flexDirection: "column" }}>
        <Text style={[styles.info, { color: typeColor, fontSize: 24 }]}>
          Abilities
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {fullData.abilities.map((ab, idx) => {
            const border_status =
              idx != fullData.abilities.length - 1 ? true : false;

            return (
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginVertical: 5,
                }}
                key={idx}
              >
                <Text style={[styles.info, { color: activeColors.textColor }]}>
                  {capitalizeString(ab.ability.name)}
                  {border_status ? ", " : null}
                </Text>
                {ab.is_hidden ? (
                  <>
                    <Text> </Text>
                    <Ionicons
                      name="eye-off-outline"
                      color={typeColor}
                      size={20}
                    />
                  </>
                ) : null}
              </View>
            );
          })}
        </View>
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
          <FlatList
            data={typeEffectObj.filter((e) => e.effectiveness != 1)}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return <TypeItem t={item} />;
            }}
          />
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

  const TypeItem = ({ t }) => {
    let pic_source = t.typeName ? t.typeName.toLowerCase() : "dragon";
    return (
      <View
        style={{
          width: "33%",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Image style={{ height: 20, width: 60 }} source={images[pic_source]} />
        {/* <Text style={{ color: t.color }}>{t.effectiveness}x</Text> */}
        <Text style={{ color: activeColors.textColor }}>
          {t.effectiveness}x
        </Text>
      </View>
    );
  };

  const InfoBody = () => {
    let egg_list = [];
    // console.log(fullData.egg_groups);
    fullData.egg_groups.map((egg, idx) => {
      egg_list.push(
        capitalizeString(egg.name).concat(
          idx != fullData.egg_groups.length - 1 ? " /" : ""
        )
      );
    });
    const egg_text = egg_list.join(" ");

    let typeEffectObj, resistances, weaknesses;
    if (types.type1 != null) {
      // console.log("made it in");
      const type2 = types.type2 ? capitalizeString(types.type2) : "None";
      const ability_name = capitalizeString(fullData.abilities[0].ability.name);
      const type_array = [capitalizeString(types.type1), type2];
      typeEffectObj = TypeEffectiveness(type_array, ability_name);
      resistances = typeEffectObj.filter((e) => e.effectiveness < 1);
      weaknesses = typeEffectObj.filter((e) => e.effectiveness > 1);
    }

    return (
      <View
        style={[
          styles.section,
          { backgroundColor: activeColors.background, borderColor: typeColor },
        ]}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.header,
              {
                backgroundColor: activeColors.background,
                borderColor: typeColor,
              },
            ]}
          >
            <Text style={[styles.headerText, { color: typeColor }]}>
              Characteristics
            </Text>
          </View>
        </View>
        <View style={styles.infoSection}>
          <View style={styles.row}>
            <InfoTopic
              title={"Height"}
              textValue={`${fullData.height / 10} m`}
              icon={"ruler"}
              side={"left"}
            />

            <InfoTopic
              title={"Growth Rate"}
              textValue={`${capitalizeString(fullData.growth_rate.name)}`}
              icon={"chart-line"}
              side={"right"}
            />
          </View>
          <View style={styles.row}>
            <InfoTopic
              title={"Weight"}
              textValue={`${fullData.weight / 10} kg`}
              icon={"scale-bathroom"}
              side={"left"}
            />
            <InfoTopic
              title={"Egg Group"}
              textValue={`${egg_text}`}
              icon={"egg"}
              side={"right"}
            />
          </View>
          <View style={styles.row}>
            <AbilityDisplay />
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <InfoTopic title={"Resistances"} icon={null} side={"left"} />
              <FlatList
                data={resistances}
                numColumns={3}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  return <TypeItem t={item} />;
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <InfoTopic title={"Weaknesses"} icon={null} side={"left"} />
              <FlatList
                data={weaknesses}
                numColumns={3}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  return <TypeItem t={item} />;
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const InfoTopic = ({ title, textValue, icon, side }) => {
    return (
      <View>
        {side == "left" ? (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.info, { color: typeColor, fontSize: 24 }]}>
                {title}{" "}
              </Text>
              {icon ? (
                <MaterialCommunityIcons
                  name={icon}
                  size={20}
                  color={typeColor}
                />
              ) : null}
            </View>
            <Text style={[styles.info, { color: activeColors.textColor }]}>
              {textValue}
            </Text>
          </>
        ) : (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name={icon} size={20} color={typeColor} />
              <Text style={[styles.info, { color: typeColor, fontSize: 24 }]}>
                {" "}
                {title}
              </Text>
            </View>
            <Text
              style={[
                styles.info,
                { color: activeColors.textColor, textAlign: "right" },
              ]}
            >
              {textValue}
            </Text>
          </>
        )}
      </View>
    );
  };

  const StyledBody = () => {
    return (
      <View style={styles.styleBody}>
        <View style={styles.firstSection}>
          <InfoBody />
          {/* <PokeGenderPie genders={fullData.gender_rate} typeColor={typeColor} />
          <TypeEffectiveBody /> */}
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
  // headerText: {
  //   fontSize: 32,
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  firstSection: {
    // justifyContent: "space-between",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 20,
    paddingHorizontal: 5,
  },
  sectional: {
    backgroundColor: "#999999",
    padding: 20,
    borderRadius: 20,
    margin: 5,
  },
  styleBody: {
    padding: 20,
  },
  // -- new style --
  header: {
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 3,
    position: "absolute",
    top: -35,
    // backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    fontSize: 16,
  },
  infoSection: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  infoItem: {
    flexDirection: "row",
  },
  row: {
    paddingVertical: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    width: width * 0.85,
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});
