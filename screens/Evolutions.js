import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import capitalizeString from "./capitalizeString";

export default function Evolutions({ route }) {
  const pokemonInfo = route.params;
  const [evolutions, setEvolutions] = useState([
    {
      evol: null,
      pic: null,
      level: null,
    },
    {
      evol: null,
      pic: null,
      level: 20,
    },
    {
      evol: null,
      pic: null,
      level: 30,
    },
  ]);
  const [variety, setVariety] = useState([]);
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
    let evol_names = [
      chain_json.chain.species?.name,
      chain_json.chain.evolves_to[0]?.species.name,
      chain_json.chain.evolves_to[0]?.evolves_to[0]?.species.name,
    ];
    console.log(
      "level",
      chain_json.chain.evolves_to[0]?.evolution_details[0].min_level
    );
    let levels = [
      null,
      chain_json.chain.evolves_to[0]?.evolution_details[0].min_level,
      chain_json.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]
        .min_level,
    ];

    pic_list = await getPictures(evol_names);

    setEvolutions([
      {
        evol: evol_names[0],
        pic: pic_list[0],
        level: levels[0],
      },
      {
        evol: evol_names[1],
        pic: pic_list[1],
        level: levels[1],
      },
      {
        evol: evol_names[2],
        pic: pic_list[2],
        level: levels[2],
      },
    ]);
  };

  const spriteFunction = async (pokemon) => {
    const response3 = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    const json3 = await response3.json();
    const pic = json3.sprites.front_default;

    return pic;
  };

  const getPictures = async (evolutions) => {
    let pic_list = [];
    const tasks = [];
    // setImgURLs([]);

    if (evolutions[0] == null || evolutions[1] == null) {
      return;
    }

    // console.log("continuing", evolutions[0]);
    for (const pokemon in evolutions) {
      const task = spriteFunction(evolutions[pokemon])
        .then((detail) => {
          pic_list.push(detail);
        })
        .catch((error) => {
          console.log("error in api");
          console.log(error.message);
        });
      tasks.push(task);
    }

    await Promise.all(tasks);
    return pic_list.sort();
  };

  // functional components

  const EvolChain = ({ pokemon1, pokemon2, img1, img2, level }) => {
    return (
      <View style={styles.evolContainer}>
        <View style={{ alignItems: "flex-start", width: "85%", padding: 5 }}>
          <Text style={{ fontSize: 28 }}>Level {level}</Text>
        </View>
        <View style={styles.pictureBox}>
          <View>
            <Image style={styles.pokemonImg} source={{ uri: img1 }} />
            <Text style={styles.pokeName}>{pokemon1}</Text>
          </View>
          <Ionicons name="arrow-forward-outline" size={40} />
          <View>
            <Image style={styles.pokemonImg} source={{ uri: img2 }} />
            <Text style={styles.pokeName}>{pokemon2}</Text>
          </View>
        </View>
      </View>
    );
  };

  const OtherForm = ({ img, fullName }) => {
    return (
      <View>
        <Image style={styles.pokemonImg} source={{ uri: img }} />
        <Text>{fullName}</Text>
      </View>
    );
  };

  useEffect(() => {
    getEvolutions(pokemonInfo.pokeName);
  }, []);

  return (
    <ScrollView>
      {evolutions[1].evol ? (
        <>
          <Text style={styles.headerText}>Evolutions</Text>
          <EvolChain
            pokemon1={evolutions[0].evol}
            pokemon2={evolutions[1].evol}
            img1={evolutions[0].pic}
            img2={evolutions[1].pic}
            level={evolutions[1].level}
          />
        </>
      ) : (
        <></>
      )}

      {evolutions[2].evol ? (
        <EvolChain
          pokemon1={evolutions[1].evol}
          pokemon2={evolutions[2].evol}
          img1={evolutions[1].pic}
          img2={evolutions[2].pic}
          level={evolutions[2].level}
        />
      ) : (
        <></>
      )}
      {variety.length > 0 ? (
        <View>
          <Text style={styles.headerText}>Other Forms</Text>
          <View style={styles.otherFormBox}>
            <View style={styles.pictureBox}>
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
    justifyContent: "space-between",
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
