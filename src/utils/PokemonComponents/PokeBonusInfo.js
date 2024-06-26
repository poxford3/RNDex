import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
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
import { stat_short } from "../../hooks/StatShorthand";

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
          {fullData[0].abilities.map((ab, idx) => {
            const border_status =
              idx != fullData[0].abilities.length - 1 ? true : false;

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
    let base_exp = fullData[0].base_experience;
    let effort_values = [];
    // check all the stats to see which ones give EVs
    for (let i = 0; i <= fullData[0].stats.length - 1; i++) {
      if (fullData[0].stats[i].effort != 0) {
        // get the shorthand name of the stat
        const ev_name = stat_short[fullData[0].stats[i].stat.name];
        effort_values.push(ev_name.concat(": ", fullData[0].stats[i].effort));
      }
    }

    let egg_list = [];
    let genderRate = 0,
      growthRate = "";
    if (fullData[1] != undefined) {
      fullData[1].egg_groups.map((egg, idx) => {
        egg_list.push(
          capitalizeString(egg.name).concat(
            idx != fullData[1].egg_groups.length - 1 ? " /" : "" // if the egg group is not the last index, add a '/' to it
          )
        );
      });
      genderRate = fullData[1].gender_rate;
      growthRate = `${capitalizeString(fullData[1].growth_rate.name)}`;
    }
    const egg_text = egg_list.join(" ");

    let typeEffectObj,
      resistances2,
      resistances4,
      weaknesses2,
      weaknesses4,
      immune;
    if (types.type1 != null) {
      const type2 = types.type2 ? capitalizeString(types.type2) : "None";
      const ability_name = capitalizeString(
        fullData[0].abilities[0].ability.name
      );
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
          {/* height, growth rate */}
          <View style={styles.row}>
            <InfoTopic
              title={"Height"}
              textValue={`${fullData[0].height / 10} m`}
              icon={"ruler"}
              side={"left"}
            />

            <InfoTopic
              title={"Growth Rate"}
              textValue={growthRate}
              icon={"chart-line"}
              side={"right"}
              tip={
                "Pokémon level up at different rates, the type of growth rate determines how much XP is needed to level up."
              }
            />
          </View>
          {/* weight, EVs */}
          <View style={styles.row}>
            <InfoTopic
              title={"Weight"}
              textValue={`${fullData[0].weight / 10} kg`}
              icon={"scale-bathroom"}
              side={"left"}
            />
            <InfoTopic
              title={"Effort Values"}
              textValue={`${effort_values.join(", ")}`}
              icon={"sword"}
              side={"right"}
              tip={
                "Pokemon receive effort values after defeat which strengthen the stats gained. Visit the Bulbapedia article on 'Effort Values' for more info."
              }
            />
          </View>
          {/* egg group, Base XP */}
          <View style={styles.row}>
            <InfoTopic
              title={"Egg Group"}
              textValue={`${egg_text}`}
              icon={"egg"}
              side={"left"}
              tip={
                "Egg groups determine which Pokemon can breed with each other. Multiple groups allow for multiple breeding combinations."
              }
            />
            <InfoTopic
              title={"Experience"}
              textValue={`${base_exp}`}
              icon={"account-arrow-up"}
              side={"right"}
              tip={
                "Pokemon of different evolution paths and rarities give experience on fainting, the base value is shown here. For more information, visit the Bulbapedia article on 'Experience'."
              }
            />
          </View>
          {/* ability */}
          <View style={styles.row}>
            <AbilityDisplay />
          </View>
          {/* genders */}
          <View style={styles.row}>
            <View style={{ flexDirection: "column" }}>
              <InfoTopic
                title={"Genders"}
                icon={"gender-male-female"}
                side={"left"}
              />
              <PokeGenderBar genders={genderRate} />
            </View>
          </View>
          {/* resistance */}
          <View style={styles.row}>
            {resistances2.length != 0 || resistances4.length != 0 ? (
              <View style={styles.multiplyRow}>
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
          {/* weakness */}
          <View style={styles.row}>
            {weaknesses2.length != 0 || weaknesses4.length != 0 ? (
              <View style={styles.multiplyRow}>
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
          {/* immunities */}
          {immune.length != 0 ? (
            <View style={styles.row}>
              <View style={{ flexDirection: "column" }}>
                <InfoTopic title={"Immunities"} icon={null} side={"left"} />
                <View style={{ alignItems: "center", flexDirection: "row" }}>
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
    const dispText = textValue == "" ? "N/A" : textValue;
    return (
      <View style={{ width: "50%" }}>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text
                numberOfLines={1}
                style={[styles.info, { color: activeColors.textColor }]}
              >
                {dispText}
              </Text>
              {tip ? <TooltipInfo tip={tip} /> : null}
            </View>
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
                {dispText}
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
        <InfoBody />
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
    width: "100%",
  },
  styleBody: {
    padding: 20,
    width: "100%",
  },
  // -- new style --
  header: {
    height: 50,
    padding: 10,
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
  row: {
    paddingVertical: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  multiplyRow: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
  section: {
    width: "100%",
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});
