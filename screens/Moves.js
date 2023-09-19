import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import capitalizeString from "./capitalizeString.js";

export default function Moves({ route }) {
  const pokemon = route.params;
  const [methSelect, setMethSelect] = useState("level-up");
  const [selected, setSelected] = useState("level-up");
  const [moveList, setMoveList] = useState([]);

  const getMoves = async (id) => {
    let tempMoveList = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const json = await response.json();

    // console.log(json.moves);

    json.moves.forEach((e) => {
      let level_or_machine;
      level_or_machine =
        e.version_group_details[0].move_learn_method.name == "level-up"
          ? e.version_group_details[0].level_learned_at
          : "TM";

      let move_obj = {
        move_name: capitalizeString(e.move.name.replace("-", " ")),
        level_learned: level_or_machine,
        method: e.version_group_details[0].move_learn_method.name,
        move_url: e.move.url,
      };
      tempMoveList.push(move_obj);
    });

    setMoveList(tempMoveList.sort((a, b) => a.level_learned - b.level_learned));
    // console.log(tempMoveList);
  };

  const moveItems = [
    {
      method: "level",
      req: 13,
      name: "Vine Whip",
      damageClass: "Physical",
      type: "grass",
      power: 50,
      accuracy: 100,
    },
    {
      method: "level",
      req: 16,
      name: "attack attack attack",
      type: "normal",
      damageClass: "Special",
      power: 50,
      accuracy: "-",
    },
    {
      method: "machine",
      req: "HM01",
      name: "Cut",
      damageClass: "Physical",
      type: "normal",
      power: 40,
      accuracy: 100,
    },
    {
      method: "machine",
      req: "HM02",
      name: "Flash",
      type: "normal",
      damageClass: "Special",
      power: "-",
      accuracy: "-",
    },
    {
      method: "machine",
      req: "TM46",
      name: "Cheese",
      type: "Psychic",
      damageClass: "Special",
      power: "100",
      accuracy: "100",
    },
  ];

  const Move = ({ item }) => {
    return (
      <View style={styles.moveBox}>
        <View style={styles.move}>
          <View style={styles.box}>
            <Text style={{ textAlign: "center" }}>{item.level_learned} </Text>
          </View>
          <Text numberOfLines={1} style={{ width: 100 }}>
            {item.move_name}
          </Text>
          {/* <Text>{item.damageClass[0]}</Text> */}
          {/* <Text>{item.type[0]}</Text> */}
          <View style={styles.box}>
            {/* <Text style={{ textAlign: "center" }}>{item.power}</Text> */}
          </View>
          <View style={styles.box}>
            {/* <Text style={{ textAlign: "center" }}>{item.accuracy}</Text> */}
          </View>
        </View>
      </View>
    );
  };

  const Selector = ({ method, text, selected }) => {
    const bkgColor = selected == method ? "blue" : "white";
    const textColor = selected == method ? "white" : "black";

    return (
      <TouchableOpacity
        style={[styles.selectorBox, { backgroundColor: bkgColor }]}
        onPress={() => {
          setMethSelect(method);
          setSelected(method);
        }}
      >
        <Text style={{ color: textColor }}>{text}</Text>
      </TouchableOpacity>
    );
  };

  // on load
  useEffect(() => {
    getMoves(pokemon.id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selector}>
        <Selector method={"level-up"} text={"Level"} selected={selected} />
        <Selector method={"machine"} text={"TM"} selected={selected} />
      </View>
      <FlatList
        data={moveList.filter((x) => x.method == methSelect)}
        renderItem={Move}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  move: {
    flexDirection: "row",
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  moveBox: {
    width: "100%",
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  moveList: {
    alignItems: "center",
  },
  selector: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
  },
  selectorBox: {
    height: 40,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
