import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import capitalizeString from "../../hooks/capitalizeString";
import TypeEffectiveness from "../../hooks/TypeEffectiveness";
import images from "../../../assets/types";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PokeGenderBar from "./PokeGenderBar";
import TooltipInfo from "../TooltipInfo";

const { height, width } = Dimensions.get("screen");

export default function PokeBonusInfo({ fullData, typeColor, types }) {
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // info:
  // height it 1/10th of a meter
  // weight is 1/10th of a kg
  // gender rate is chance of being female in 1/8ths, -1 == genderless

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
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginVertical: 5,
                }}
                key={idx}
                onPress={() => {
                  navigation.navigate("AbilityDetails", {
                    id: ab.ability.url.split("/")[6],
                    mainColor: typeColor,
                    is_hidden: ab.is_hidden,
                  });
                }}
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
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
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
      </View>
    );
  };

  const InfoBody = () => {
    let egg_list = [];
    fullData.egg_groups.map((egg, idx) => {
      egg_list.push(
        capitalizeString(egg.name).concat(
          idx != fullData.egg_groups.length - 1 ? " /" : ""
        )
      );
    });
    const egg_text = egg_list.join(" ");

    let typeEffectObj,
      resistances2,
      resistances4,
      weaknesses2,
      weaknesses4,
      immune;
    if (types.type1 != null) {
      const type2 = types.type2 ? capitalizeString(types.type2) : "None";
      const ability_name = capitalizeString(fullData.abilities[0].ability.name);
      const type_array = [capitalizeString(types.type1), type2];
      typeEffectObj = TypeEffectiveness(type_array, ability_name);
      resistances2 = typeEffectObj.filter((e) => e.effectiveness == 0.5);
      resistances4 = typeEffectObj.filter((e) => e.effectiveness == 0.25);
      weaknesses2 = typeEffectObj.filter((e) => e.effectiveness == 2);
      weaknesses4 = typeEffectObj.filter((e) => e.effectiveness == 4);
      immune = typeEffectObj.filter((e) => e.effectiveness == 0);
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
              tip={
                "Pokemon level up at different rates, the type of growth rate determines how much XP is needed to level up."
              }
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
              tip={
                "Egg groups determine which Pokemon can breed with each other. Multiple groups allow for multiple breeding combinations."
              }
            />
          </View>
          <View style={styles.row}>
            <AbilityDisplay />
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <InfoTopic
                title={"Genders"}
                icon={"gender-male-female"}
                side={"left"}
              />
              <PokeGenderBar genders={fullData.gender_rate} />
            </View>
          </View>
          <View style={styles.row}>
            {resistances2.length != 0 || resistances4.length != 0 ? (
              <View style={{ flexDirection: "column" }}>
                <InfoTopic title={"Resistances"} icon={null} side={"left"} />
                {resistances2.length != 0 ? (
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <View style={{ width: "15%" }}>
                      <Text
                        style={[styles.info, { color: activeColors.textColor }]}
                      >
                        1/2x
                      </Text>
                    </View>
                    <View style={{ width: "85%" }}>
                      <FlatList
                        data={resistances2}
                        numColumns={3}
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                          return <TypeItem t={item} />;
                        }}
                      />
                    </View>
                  </View>
                ) : null}
                {resistances4.length != 0 ? (
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <Text
                        style={[styles.info, { color: activeColors.textColor }]}
                      >
                        1/4x
                      </Text>
                    </View>
                    <View style={{ width: "85%" }}>
                      <FlatList
                        data={resistances4}
                        numColumns={3}
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                          return <TypeItem t={item} />;
                        }}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
          <View style={styles.row}>
            {weaknesses2.length != 0 || weaknesses4.length != 0 ? (
              <View style={{ flexDirection: "column" }}>
                <InfoTopic title={"Weaknesses"} icon={null} side={"left"} />
                {weaknesses2.length != 0 ? (
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <View style={{ width: "15%" }}>
                      <Text
                        style={[styles.info, { color: activeColors.textColor }]}
                      >
                        2x
                      </Text>
                    </View>
                    <View style={{ width: "85%" }}>
                      <FlatList
                        data={weaknesses2}
                        numColumns={3}
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                          return <TypeItem t={item} />;
                        }}
                      />
                    </View>
                  </View>
                ) : null}
                {weaknesses4.length != 0 ? (
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <View style={{ width: "15%" }}>
                      <Text
                        style={[styles.info, { color: activeColors.textColor }]}
                      >
                        4x
                      </Text>
                    </View>
                    <View style={{ width: "85%" }}>
                      <FlatList
                        data={weaknesses4}
                        numColumns={3}
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                          return <TypeItem t={item} />;
                        }}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
          {immune.length != 0 ? (
            <View style={styles.row}>
              <View style={{ flexDirection: "column" }}>
                <InfoTopic title={"Immunities"} icon={null} side={"left"} />
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <View style={{ width: "15%" }}>
                    <Text
                      style={[styles.info, { color: activeColors.textColor }]}
                    >
                      0x
                    </Text>
                  </View>
                  <View style={{ width: "85%" }}>
                    <FlatList
                      data={immune}
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
          ) : null}
        </View>
      </View>
    );
  };

  const InfoTopic = ({ title, textValue, icon, side, tip }) => {
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
            {tip ? <TooltipInfo tip={tip} /> : null}
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <MaterialCommunityIcons name={icon} size={20} color={typeColor} />
              <Text style={[styles.info, { color: typeColor, fontSize: 24 }]}>
                {" "}
                {title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={[
                  styles.info,
                  { color: activeColors.textColor, textAlign: "right" },
                ]}
              >
                {textValue}
              </Text>
              {tip ? <TooltipInfo tip={tip} /> : null}
            </View>
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
  firstSection: {
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
