import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import capitalizeString from "../functions/capitalizeString";
import handleEvolutions from "../functions/handleEvolutions";

export default function Evolutions({ navigation, route }) {
  const pokemonInfo = route.params;
  const [evolutions, setEvolutions] = useState([
    {
      evol: null,
      level: null,
      id: null,
    },
    {
      evol: null,
      level: null,
      id: null,
    },
    {
      evol: null,
      level: null,
      id: null,
    },
  ]);
  const [variety, setVariety] = useState([]);
  const [scrollOn, setScrollOn] = useState(true);
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png

  const getEvolutions = async (name) => {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    const response = await fetch(url);
    const json = await response.json();
    let formType = "";

    if (json.varieties.length > 1) {
      json.varieties.forEach((e) => {
        if (e.is_default == false) {
          // console.log(e.pokemon.name, e.pokemon.url.split("/")[6]);
          let temp_id = e.pokemon.url.split("/")[6];

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
            },
          ]);
        }
      });
    }

    let chain_url = json.evolution_chain.url;
    const chain_resp = await fetch(chain_url);
    const chain_json = await chain_resp.json();

    setEvolutions(handleEvolutions(chain_json));

    if (
      (evolutions[1] == null || evolutions[1] === undefined) &&
      variety.length > 0
    ) {
      setScrollOn(false);
      console.log("no evolutions or extra forms");
      console.log(evol_names[1], variety.length);
      return;
    }
  };

  // functional components

  const EvolChain = ({ pokemon1, pokemon2 }) => {
    const img1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon1.id}.png`;
    const img2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon2.id}.png`;
    const method_level =
      pokemon2.method == "level-up" && pokemon2.happy == 0
        ? `Level ${pokemon2.level}`
        : pokemon2.method == "level-up" && pokemon2.move != null
        ? `Level up knowing ${pokemon2.move}`
        : pokemon2.method == "level-up" && pokemon2.time != null
        ? `Level up during the ${pokemon2.time}`
        : pokemon2.method == "level-up" && pokemon2.happy > 0
        ? `Level up with high happiness`
        : null;
    const method = method_level
      ? method_level
      : pokemon2.method == "trade"
      ? `Trade`
      : pokemon2.method == "use-item"
      ? `${pokemon2.item}`
      : `Other`;
    // console.log(pokemon2.id);

    return (
      <View style={styles.evolContainer}>
        <View style={{ alignItems: "flex-start", width: "85%", padding: 5 }}>
          <Text style={{ fontSize: 28 }}>{method}</Text>
        </View>
        <View style={[styles.pictureBox, { justifyContent: "space-around" }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.setOptions({
                id: pokemon1.id,
              });
              navigation.navigate("Pokemon", {
                sprite: img1,
                pokeName: pokemon1.evol,
                id: pokemon1.id,
              });
            }}
          >
            <Image style={styles.pokemonImg} source={{ uri: img1 }} />
            <Text style={styles.pokeName}>{pokemon1.evol}</Text>
          </TouchableOpacity>
          <Ionicons name="arrow-forward-outline" size={40} />
          <TouchableOpacity
            onPress={() => {
              navigation.setOptions({
                id: pokemon2.id,
              });
              navigation.navigate("Pokemon", {
                sprite: img2,
                pokeName: pokemon2.evol,
                id: pokemon2.id,
              });
            }}
          >
            <Image style={styles.pokemonImg} source={{ uri: img2 }} />
            <Text style={styles.pokeName}>{pokemon2.evol}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const OtherForm = ({ img, fullName }) => {
    return (
      <TouchableOpacity>
        <Image style={styles.pokemonImg} source={{ uri: img }} />
        <Text>{fullName}</Text>
      </TouchableOpacity>
    );
  };

  const NoEvolutionsView = () => {
    return (
      <View
        style={{
          height: Dimensions.get("window").height - 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`,
          }}
          style={styles.pokemonImg}
        />
        <Text>
          {capitalizeString(pokemonInfo.pokeName)} has no evolutions or other
          forms
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getEvolutions(pokemonInfo.pokeName);
  }, []);

  return (
    <ScrollView scrollEnabled={scrollOn}>
      {scrollOn ? (
        <>
          {evolutions[1].evol ? (
            <>
              <Text style={styles.headerText}>Evolutions</Text>
              <EvolChain pokemon1={evolutions[0]} pokemon2={evolutions[1]} />
            </>
          ) : (
            <></>
          )}

          {evolutions[2].evol ? (
            <EvolChain pokemon1={evolutions[1]} pokemon2={evolutions[2]} />
          ) : (
            <></>
          )}
          {variety.length > 0 ? (
            <View>
              <Text style={styles.headerText}>Other Forms</Text>
              <View style={styles.otherFormBox}>
                <View
                  style={[
                    styles.pictureBox,
                    {
                      justifyContent:
                        variety.length == 1 ? "center" : "space-around",
                    },
                  ]}
                >
                  {variety.map((item, index) => {
                    return (
                      <View key={index}>
                        <OtherForm
                          img={item.img_url}
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
        <NoEvolutionsView />
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
    backgroundColor: "lightgrey",
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
