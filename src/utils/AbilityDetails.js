import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import API_CALL from "../hooks/API_CALL";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import capitalizeString, { capitalizeGens } from "../hooks/capitalizeString";
import CustomDivider from "./CustomDivider";
import LoadingView from "./LoadingView";

export default function AbilityDetails(route) {
  let ab_id = route.route.params.id;
  let mainColor = route.route.params.mainColor;
  let is_hidden = route.route.params.is_hidden;

  const pokemonInfo = useContext(PokemonContext).pokemon;
  const updatePokemon = useContext(PokemonContext).updatePokemon;

  const [ability, setAbility] = useState(null);
  const [abilityDesc, setAbilityDesc] = useState("");
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getAbilityDetail = async (id) => {
    let url = `https://pokeapi.co/api/v2/ability/${id}/`;
    // console.log(url);
    const ability_json = await API_CALL(url);
    setAbility(ability_json);
    let ab_desc = ability_json.flavor_text_entries.filter(
      (e) => e.language.name === "en"
    )[0].flavor_text;

    setAbilityDesc(ab_desc.replaceAll("\n", " "));
  };

  useEffect(() => {
    getAbilityDetail(ab_id);
  }, []);

  const AbilityItem = ({ header, info }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <View>
          <Text style={{ color: mainColor, fontSize: 20, paddingRight: 5 }}>
            {header}{" "}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: activeColors.textColor, fontSize: 20 }}>
              {info}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const OtherLangList = () => {
    const abilityNameList = [
      ...new Set(ability.names.map((item) => item.name)),
    ].sort();
    // console.log(abilityNameList);
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: mainColor, fontSize: 20, paddingRight: 5 }}>
          In Other Languages
        </Text>
        {abilityNameList
          .filter((e) => e != capitalizeString(ability.name))
          .map((ab_name, idx) => {
            return (
              <Text
                style={{
                  color: activeColors.textColor,
                  fontSize: 20,
                  // textDecorationLine: "underline",
                }}
                onPress={() => {
                  const translateURL = `https://translate.google.com/?sl=auto&tl=en&text=${ab_name}&op=translate`;
                  Linking.openURL(translateURL);
                }}
                key={idx}
              >
                - {ab_name}
              </Text>
            );
          })}
      </View>
    );
  };

  const OtherPokeList = () => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: mainColor, fontSize: 20, paddingRight: 5 }}>
          Pokemon with same ability
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {ability.pokemon.map((poke_name, idx) => {
            const poke_id = poke_name.pokemon.url.split("/")[6];
            const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke_id}.png`;
            // console.log(poke_sprite);
            return (
              <View
                key={idx}
                style={{
                  marginBottom: 3,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: poke_sprite }}
                  style={styles.pokeSpriteImg}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const abilityShortEffect = ability
    ? ability.effect_entries.filter((e) => e.language.name === "en")[0]
        .short_effect
    : null;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {ability ? (
        <ScrollView>
          <View style={styles.header}>
            <Text style={{ color: mainColor, fontSize: 32 }}>
              {capitalizeString(ability.name)}{" "}
            </Text>
            {is_hidden ? (
              <>
                <Text> </Text>
                <Ionicons name="eye-off-outline" color={mainColor} size={28} />
              </>
            ) : null}
          </View>
          <View style={styles.body}>
            <View style={{ width: "95%", padding: 10 }}>
              <Text style={{ color: activeColors.textColor, fontSize: 20 }}>
                {abilityDesc}
              </Text>
              <CustomDivider direction={"horizontal"} />
              <AbilityItem header={"Effect"} info={abilityShortEffect} />
              <AbilityItem
                header={"Hidden Ability?"}
                info={is_hidden ? "Yes" : "No"}
              />
              <AbilityItem
                header={"Generation Introduced"}
                info={capitalizeGens(ability.generation.name)}
              />
              <OtherLangList />
              <OtherPokeList />
            </View>
          </View>
        </ScrollView>
      ) : (
        <LoadingView />
      )}
    </SafeAreaView>
  );
}

const SPRITE_SIZE = 75;
const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  pokeSpriteImg: {
    height: SPRITE_SIZE,
    width: SPRITE_SIZE,
  },
});
