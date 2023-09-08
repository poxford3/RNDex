import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";

export default function Pokemon({ route }) {
  const pokemonInfo = route.params;
  const new_sprite = pokemonInfo.spriteData?.other?.home.front_default;

  const [stats, setStats] = useState([]);
  const [types, setTypes] = useState({
    type1: null,
    type2: null,
  });

  const sprite_to_use = new_sprite ? new_sprite : pokemonInfo.sprite;

  const getPokeStats = async () => {
    url = `https://pokeapi.co/api/v2/pokemon/${pokemonInfo.pokeName}`;
    let stat_list = [];
    const response = await fetch(url);
    const json = await response.json();

    // console.log(json.stats);
    json.stats.forEach((e) => {
      stat_list = [
        ...stat_list,
        { statName: e.stat.name, base_stat: e.base_stat, EV: e.effort },
      ];
    });

    let type_obj = {
      type1: json.types[0].type.name,
      type2: json.types[1]?.type?.name,
    };

    setStats(stat_list);
    setTypes(type_obj);
  };

  const PokeStats = ({ item }) => {
    return (
      <View style={styles.statTexts}>
        <Text style={{ textTransform: "capitalize", fontSize: 24 }}>
          {item.statName}
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 20 }}>Base Value: {item.base_stat}</Text>
          <Text style={{ fontSize: 20 }}>EV: {item.EV}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getPokeStats();
  }, []);

  // console.log(pokemonInfo);
  // will be view of once pokemon is clicked
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Image
          source={{
            uri: sprite_to_use,
          }}
          style={styles.images}
        />
        {types.type2 ? (
          <View style={{ paddingTop: 10 }}>
            <Text style={{ textTransform: "capitalize", fontSize: 24 }}>
              {types.type1} / {types.type2}
            </Text>
          </View>
        ) : (
          <View style={{ paddingTop: 10 }}>
            <Text style={{ textTransform: "capitalize", fontSize: 24 }}>
              Type: {types.type1}
            </Text>
          </View>
        )}
        <View style={styles.statBox}>
          <FlatList data={stats} renderItem={PokeStats} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  images: {
    height: 300,
    width: 300,
  },
  statBox: {
    height: "100%",
    width: "100%",
    padding: 20,
  },
  statTexts: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
