import React, { useContext, useState, useEffect, memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PokemonContext } from "../../contexts/PokemonContext";
import API_CALL from "../../hooks/API_CALL";
import LoadingView from "../LoadingView";
import capitalizeString from "../../hooks/capitalizeString";

export default function LocationView({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const updatePokemon = useContext(PokemonContext).updatePokemon;

  const [locationDetails, setLocationDetails] = useState();
  const [locationAreaDetails, setLocationAreaDetails] = useState();
  const [loaded, setLoaded] = useState(false);
  const textSizeBody = 14;

  const getLocationData = async () => {
    const response = await API_CALL(route.params.route.url);

    let temp_area_list = [];
    let tasks = [];
    response.areas.forEach(async (area) => {
      const task = getLocationAreaDetails(area.url).then((detail) => {
        temp_area_list.push(detail);
      });
      tasks.push(task);
    });

    await Promise.all(tasks);
    // const area_info = await API_CALL(area.url);
    // console.log("temp", temp_area_list);

    setLocationDetails(response);
    setLocationAreaDetails(temp_area_list);
    setLoaded(true);
  };

  const getLocationAreaDetails = async (url) => {
    const response = await API_CALL(url);

    return response;
  };

  const PokemonRow = ({ e }) => {
    // console.log("eee", e);
    const poke_id = e.pokemon.url.split("/")[6];
    const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke_id}.png`;

    // check if there is a level range for pokemon, if not just show the min level
    let levelDisp;
    if (
      e.version_details[0].encounter_details[0].min_level ==
      e.version_details[0].encounter_details[0].max_level
    ) {
      levelDisp = `${e.version_details[0].encounter_details[0].min_level}`;
    } else {
      levelDisp = `${e.version_details[0].encounter_details[0].min_level} - ${e.version_details[0].encounter_details[0].max_level}`;
    }

    // prepare all the values to be shown before mapping them in
    let dispValues = [
      capitalizeString(e.pokemon.name),
      capitalizeString(e.version_details[0].encounter_details[0].method.name),
      levelDisp,
      `${capitalizeString(e.version_details[0].encounter_details[0].chance)}%`,
    ];
    return (
      <TouchableOpacity
        onPress={() => {
          updatePokemon({
            id: poke_id,
            pokeName: e.pokemon.name,
          });
          navigation.navigate("PokemonTabNav");
        }}
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Image source={{ uri: poke_sprite }} style={styles.pokeSpriteImg} />
        {dispValues.map((val, idx) => {
          return (
            <View style={{ width: "20%", alignItems: "center" }} key={idx}>
              <Text
                style={{
                  color: activeColors.textColor,
                  fontSize: textSizeBody,
                }}
              >
                {val}
              </Text>
            </View>
          );
        })}
      </TouchableOpacity>
    );
  };

  const StickyHeader = () => {
    const headers = ["Name", "Method", "Level", "Chance"];
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
          backgroundColor: activeColors.background,
        }}
      >
        <View style={{ width: SPRITE_SIZE }}></View>
        {headers.map((header, idx) => {
          return (
            <View style={{ width: "20%", alignItems: "center" }} key={idx}>
              <Text
                style={{
                  color: activeColors.textColor,
                  fontSize: textSizeBody,
                }}
              >
                {header}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const PokeAreaDetailsBody = memo(function PokeAreaDetailsBody() {
    return (
      <View>
        {locationAreaDetails
          ? locationAreaDetails.map((areaD, idx) => {
              return (
                <View key={idx} style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      color: activeColors.textColor,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {capitalizeString(areaD.name)}
                  </Text>
                  <View>
                    {areaD.pokemon_encounters.map((e, i) => {
                      return <PokemonRow key={i} e={e} />;
                    })}
                  </View>
                </View>
              );
            })
          : null}
      </View>
    );
  });

  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {loaded ? (
        <ScrollView
          style={{ paddingHorizontal: 10 }}
          // StickyHeaderComponent={StickyHeader}
          stickyHeaderIndices={[1]}
          // stickyHeaderHiddenOnScroll
        >
          <View>
            <Text
              style={{
                color: activeColors.textColor,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Region
            </Text>
            <Text
              style={{ color: activeColors.textColor, fontSize: textSizeBody }}
            >
              {capitalizeString(locationDetails.region.name)}
            </Text>
          </View>
          <StickyHeader />
          <PokeAreaDetailsBody />
        </ScrollView>
      ) : (
        <LoadingView />
      )}
    </SafeAreaView>
  );
}

const SPRITE_SIZE = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokeSpriteImg: {
    height: SPRITE_SIZE,
    width: SPRITE_SIZE,
    // width: "20%",
  },
});
