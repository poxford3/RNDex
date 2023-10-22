import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import capitalizeString from "../hooks/capitalizeString";
import handleEvolutions from "../hooks/handleEvolutions";
import MissingInfo from "../utils/MissingInfo";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import LoadingView from "../utils/LoadingView";

export default function Evolutions({ navigation, route }) {
  // const pokemonInfo = route.params;
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const updatePokemon = useContext(PokemonContext).updatePokemon;
  const [evolutions, setEvolutions] = useState([]);
  const [variety, setVariety] = useState([]);
  const [scrollOn, setScrollOn] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getEvolutions = async (name) => {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const response = await fetch(url);
    const json = await response.json();
    let formType = "";

    if (json.varieties.length > 1) {
      json.varieties.forEach((e) => {
        if (e.is_default == false) {
          let temp_id = e.pokemon.url.split("/")[6];
          // console.log(e.pokemon.url);

          e.pokemon.name.includes("mega")
            ? (formType = "Mega")
            : e.pokemon.name.includes("gmax")
            ? "GMax"
            : e.pokemon.name.includes("alola")
            ? "Alola"
            : "Other";

          setVariety((prevList) => [
            ...prevList,
            {
              form: formType,
              img_url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${temp_id}.png`,
              pokeNameForm: capitalizeString(e.pokemon.name.replace("-", " ")),
              id: temp_id,
            },
          ]);
        }
      });
    }

    let chain_url = json.evolution_chain.url;
    const chain_resp = await fetch(chain_url);
    const chain_json = await chain_resp.json();

    let evols = [];
    evols = handleEvolutions(chain_json.chain);
    setEvolutions(evols);
    // console.log("post set", evolutions);

    // console.log("ahhhhh", evols.length, variety.length == 0);
    if (evols.length == 0 && variety.length == 0) {
      setScrollOn(false);
      console.log("no evolutions or extra forms");
      // console.log(evol_names[1], variety.length);
      return;
    } else {
      setScrollOn(true);
    }
  };

  // functional components

  const EvolChain = ({ poke_pair }) => {
    const img1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke_pair.base_id}.png`;
    const img2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke_pair.evo_id}.png`;

    // console.log(poke_pair);

    // determine what to display to show how to evolve
    let method_level;
    switch (true) {
      case poke_pair.level != null && poke_pair.time == "":
        method_level = `Level ${poke_pair.level}`;
        break;
      case poke_pair.level != null && poke_pair.time != "":
        method_level = `Level up (${poke_pair.level}) during the ${poke_pair.time}`;
        break;
      case poke_pair.level != null && poke_pair.location != null:
        method_level = `Level up (${poke_pair.level}) during the ${poke_pair.time}`;
        break;
      case poke_pair.level == null &&
        poke_pair.move_type != null &&
        poke_pair.happy > 0:
        method_level = `Level up with high happiness knowing a ${poke_pair.move_type} type move`;
        break;
      case poke_pair.level == null &&
        poke_pair.time != undefined &&
        poke_pair.happy > 0:
        method_level = `Level up with high happiness during the ${poke_pair.time}`;
        break;
      case poke_pair.level == null && poke_pair.happy > 0:
        method_level = `Level up with high happiness`;
        break;
      case poke_pair.level == null && poke_pair.location != null:
        method_level = `Level up at ${poke_pair.location}`;
        break;
      case poke_pair.level == null && poke_pair.move != null:
        method_level = `Level up knowing ${poke_pair.move}`;
        break;
      default:
        method_level = null;
        break;
    }
    const method = method_level
      ? method_level
      : poke_pair.method == "trade" && poke_pair.held_item == null
      ? `Trade`
      : poke_pair.method == "trade" && poke_pair.held_item != null
      ? `Trade with ${poke_pair.held_item} held`
      : poke_pair.method == "use-item"
      ? `Use ${poke_pair.item}`
      : `Other`;

    return (
      <View style={styles.evolContainer}>
        <View style={{ alignItems: "flex-start", width: "85%", padding: 5 }}>
          <Text style={{ fontSize: 28, color: activeColors.textColor }}>
            {method}
          </Text>
        </View>
        <View
          style={[
            styles.pictureBox,
            {
              justifyContent: "space-around",
              backgroundColor: activeColors.accent,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              updatePokemon({
                id: poke_pair.base_id,
                pokeName: poke_pair.base,
              });
              navigation.navigate("Pokemon");
            }}
          >
            <Image style={styles.pokemonImg} source={{ uri: img1 }} />
            <Text style={styles.pokeName}>{poke_pair.base}</Text>
          </TouchableOpacity>
          <Ionicons name="arrow-forward-outline" size={40} />
          <TouchableOpacity
            onPress={() => {
              updatePokemon({
                id: poke_pair.evo_id,
                pokeName: poke_pair.evolves_to,
              });
              navigation.navigate("Pokemon");
            }}
          >
            <Image style={styles.pokemonImg} source={{ uri: img2 }} />
            <Text style={styles.pokeName}>{poke_pair.evolves_to}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const OtherForm = ({ pokemon }) => {
    let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    return (
      <TouchableOpacity
        onPress={() => {
          updatePokemon({
            id: pokemon.id,
            pokeName: pokemon.pokeNameForm,
          });
          navigation.navigate("Pokemon");
        }}
      >
        <Image style={styles.pokemonImg} source={{ uri: img }} />
        {/* <Text>{pokemon.pokeNameForm}</Text> */}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setEvolutions([]);
    setVariety([]);
    getEvolutions(pokemonInfo.pokeName);
  }, [pokemonInfo]);

  return (
    <ScrollView
      scrollEnabled={scrollOn}
      style={{ backgroundColor: activeColors.background }}
    >
      {scrollOn ? (
        <View style={styles.container}>
          {evolutions.length > 0 ? (
            <View style={{ width: "100%" }}>
              <Text
                style={[styles.headerText, { color: activeColors.textColor }]}
              >
                Evolutions
              </Text>
              {evolutions.map((evo, idx) => {
                return <EvolChain poke_pair={evo} key={idx} />;
              })}
            </View>
          ) : (
            <LoadingView />
          )}
          {variety.length > 0 ? (
            <View>
              <Text
                style={[styles.headerText, { color: activeColors.textColor }]}
              >
                Other Forms
              </Text>
              <View style={styles.otherFormBox}>
                <View
                  style={[
                    styles.pictureBox,
                    {
                      justifyContent:
                        variety.length == 1 ? "center" : "space-around",
                      backgroundColor: activeColors.accent,
                    },
                  ]}
                >
                  {variety.map((item, index) => {
                    return (
                      <View key={index}>
                        <OtherForm
                          pokemon={item}
                          // fullName={item.pokeNameForm}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          ) : null}
        </View>
      ) : (
        <MissingInfo
          str={`${capitalizeString(pokemonInfo.pokeName)} has no evolutions`}
          id={pokemonInfo.id}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  evolContainer: {
    // height: 80,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 32,
    padding: 10,
  },
  otherFormBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  pictureBox: {
    width: "85%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "lightgrey",
    borderRadius: 10,
  },
  pokeName: {
    fontSize: 24,
    textTransform: "capitalize",
    textAlign: "center",
  },
  pokemonImg: {
    height: 90,
    width: 90,
    marginHorizontal: 10,
  },
});
