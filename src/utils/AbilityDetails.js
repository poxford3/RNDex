import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import API_CALL from "../hooks/API_CALL";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import capitalizeString, { capitalizeGens } from "../hooks/capitalizeString";
import CustomDivider from "./CustomDivider";
import LoadingView from "./LoadingView";
import PullTab from "./PullTab";
import ModalCloseButton from "./ModalCloseButton";
import { useNavigation } from "@react-navigation/native";

export default function AbilityDetails({ route }) {
  let ab_id = route.params.id;
  let mainColor = route.params.mainColor;
  let is_hidden = route.params.is_hidden;
  // this can either be a modal or a main view,
  // depending on where it's sourced
  var modal_on = true;
  if (route.params.modal == false) {
    modal_on = route.params.modal;
  }
  const navigation = useNavigation();

  const [ability, setAbility] = useState(null);
  const [abilityDesc, setAbilityDesc] = useState("");
  const [abilityEffect, setAbilityEffect] = useState("");
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const updatePokemon = useContext(PokemonContext).updatePokemon;

  const getAbilityDetail = async (id) => {
    let url = `https://pokeapi.co/api/v2/ability/${id}/`;
    const ability_json = await API_CALL(url);
    setAbility(ability_json);
    let ab_desc;
    if (ability_json.flavor_text_entries.length > 0) {
      ab_desc = ability_json.flavor_text_entries.filter(
        (e) => e.language.name === "en"
      )[0].flavor_text; // gets most recent english description
    } else {
      ab_desc =
        "No description yet, return later to see if one has been added.";
    }

    let ab_effect;
    if (ability_json.effect_entries.length > 0) {
      ab_effect = ability
        ? ability_json.effect_entries.filter((e) => e.language.name === "en")[0]
            .short_effect
        : null;
    } else {
      ab_effect = "No effect yet, return later to see if one has been added.";
    }

    // let abDescText = ab_desc == null ? "" : ab_desc.replaceAll("\n", " ");
    // let abEffectText = ab_effect == null ? "" : ab_effect.replaceAll("\n", " ");
    // // console.log(abDescText, "\n", ab_desc);
    // console.log("\nabef:", ab_effect, "\nabde:", ab_desc, "\n");
    // console.log("\nabef2:", abEffectText, "\nabde2:", abDescText, "\n");

    setAbilityDesc(ab_desc.replaceAll("\n", " "));
    setAbilityEffect(ab_effect.replaceAll("\n", " "));
  };

  useEffect(() => {
    getAbilityDetail(ab_id);
  }, []);

  const AbilityItem = ({ header, info }) => {
    let dispText = info == "" ? "N/A" : info;
    return (
      <View style={{ marginVertical: 10 }}>
        <View>
          <Text style={[styles.headerText, { color: mainColor }]}>
            {header}{" "}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: activeColors.textColor, fontSize: 20 }}>
              {dispText}
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
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={[styles.headerText, { color: mainColor }]}>
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
                }}
                onPress={() => {
                  const translateURL = `https://translate.google.com/?sl=auto&tl=en&text=${ab_name}&op=translate`;
                  Linking.openURL(translateURL);
                }}
                key={ab_name}
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
        <Text style={[styles.headerText, { color: mainColor }]}>
          Pokémon with same ability
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
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  {
                    modal_on ? navigation.goBack() : null;
                  }
                  updatePokemon({
                    id: poke_id,
                    pokeName: poke_name.pokemon.name,
                  });
                  {
                    modal_on
                      ? navigation.navigate("Pokemon")
                      : navigation.navigate("PokemonTabNav");
                  }
                }}
              >
                <Image
                  source={{ uri: poke_sprite }}
                  style={styles.pokeSpriteImg}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const Body = () => {
    return (
      <View style={{ flex: 1 }}>
        {modal_on ? (
          <View style={styles.header}>
            <Text
              style={[styles.headerText, { color: mainColor, fontSize: 32 }]}
            >
              {capitalizeString(ability.name)}{" "}
            </Text>
            {is_hidden ? (
              <>
                <Text> </Text>
                <Ionicons name="eye-off-outline" color={mainColor} size={28} />
              </>
            ) : null}
          </View>
        ) : null}
        <CustomDivider direction={"horizontal"} />
        <ScrollView style={{}}>
          <View style={styles.body}>
            <View style={{ width: "95%", padding: 10 }}>
              <AbilityItem header={"Description"} info={abilityDesc} />
              <AbilityItem header={"Effect"} info={abilityEffect} />
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
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {modal_on ? (
        <>
          <PullTab />
          <ModalCloseButton navigation={navigation} />
        </>
      ) : null}
      {ability ? <Body /> : <LoadingView />}
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
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 20,
    paddingRight: 5,
    fontWeight: "bold",
  },
  pokeSpriteImg: {
    height: SPRITE_SIZE,
    width: SPRITE_SIZE,
  },
});
