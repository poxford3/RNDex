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

export default function Evolutions({ navigation, route }) {
  const pokemonInfo = route.params;
  // const [evolutions, setEvolutions] = useState([
  //   {
  //     base: null,
  //     base_id: null,
  //     evolves_to: null,
  //     evo_id: null,
  //     method: null,
  //   },
  // ]);
  const [evolutions, setEvolutions] = useState([]);
  const [variety, setVariety] = useState([]);
  const [scrollOn, setScrollOn] = useState(true);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getEvolutions = async (name) => {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const response = await fetch(url);
    const json = await response.json();
    let formType = "";

    // console.log("var length", json.varieties.length);
    if (json.varieties.length > 1) {
      json.varieties.forEach((e) => {
        if (e.is_default == false) {
          // console.log(e.pokemon.name, e.pokemon.url.split("/")[6]);
          let temp_id = e.pokemon.url.split("/")[6];
          console.log(e.pokemon.url);

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
    console.log(chain_url);
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
    let method_level;
    // determine what to display to show how to evolve
    switch (true) {
      case poke_pair.level != null && poke_pair.time == undefined:
        method_level = `Level ${poke_pair.level}`;
        break;
      case poke_pair.level != null && poke_pair.time != undefined:
        method_level = `Level up (${poke_pair.level}) during the ${poke_pair.time}`;
        break;
      case poke_pair.level == null && poke_pair.happy > 0:
        method_level = `Level up with high happiness`;
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
      : poke_pair.method == "trade"
      ? `Trade`
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
              navigation.setOptions({
                // id: poke_pair.baes_id,
                pokeName: poke_pair.base,
              });
              navigation.navigate("Pokemon", {
                sprite: img1,
                pokeName: poke_pair.base,
                id: poke_pair.base_id,
              });
            }}
          >
            <Image style={styles.pokemonImg} source={{ uri: img1 }} />
            <Text style={styles.pokeName}>{poke_pair.base}</Text>
          </TouchableOpacity>
          <Ionicons name="arrow-forward-outline" size={40} />
          <TouchableOpacity
            onPress={() => {
              navigation.setOptions({
                id: poke_pair.evo_id,
              });
              navigation.navigate("Pokemon", {
                sprite: img2,
                pokeName: poke_pair.evolves_to,
                id: poke_pair.evo_id,
              });
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
          navigation.setOptions({
            id: pokemon.id,
          });
          navigation.navigate("Pokemon", {
            sprite: img,
            pokeName: pokemon.pokeNameForm,
            id: pokemon.id,
          });
        }}
      >
        <Image style={styles.pokemonImg} source={{ uri: img }} />
        {/* <Text>{pokemon.pokeNameForm}</Text> */}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getEvolutions(pokemonInfo.pokeName);
  }, []);

  return (
    <ScrollView
      scrollEnabled={scrollOn}
      style={{ backgroundColor: activeColors.background }}
    >
      {scrollOn ? (
        <>
          {evolutions.length > 0 ? (
            <>
              <Text
                style={[styles.headerText, { color: activeColors.textColor }]}
              >
                Evolutions
              </Text>
              {evolutions.map((evo, idx) => {
                return <EvolChain poke_pair={evo} key={idx} />;
              })}
            </>
          ) : (
            <></>
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
          ) : (
            <></>
          )}
        </>
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
