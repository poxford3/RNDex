import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SegmentedButtons } from "react-native-paper";
import LoadingView from "../utils/LoadingView";
import images from "../../assets/types";
import capitalizeString from "../functions/capitalizeString.js";

export default function Moves({ route }) {
  const pokemonInfo = route.params;
  const [methSelect, setMethSelect] = useState("level-up");
  const [selected, setSelected] = useState("level-up");
  const [moveList, setMoveList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getMoves = async (id) => {
    let tempMoveList = [];
    let tasks = [];
    setLoaded(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const json = await response.json();

    // console.log(json.moves);

    json.moves.forEach(async (e) => {
      let move_obj = {
        move_name: capitalizeString(e.move.name.replace("-", " ")),
        level_learned: e.version_group_details[0].level_learned_at,
        method: e.version_group_details[0].move_learn_method.name,
        move_url: e.move.url,
      };

      const task = getMoveDetails(e.move.url).then((detail) => {
        detail[0] == null ? (accuracy = "-") : (accuracy = detail[0]);
        detail[1] == null ? (power = "-") : (power = detail[1]);
        move_obj.accuracy = accuracy;
        move_obj.power = power;
        move_obj.type = detail[2];
        move_obj.damageClass = detail[3];
        move_obj.mach_name = detail[4];

        tempMoveList.push(move_obj);
      });
      tasks.push(task);
    });

    await Promise.all(tasks);
    setMoveList(tempMoveList.sort((a, b) => a.level_learned - b.level_learned));
    setLoaded(true);
    // console.log(moveList[0]);
    // console.log(tempMoveList);
  };

  const getMoveDetails = async (url) => {
    const response = await fetch(url);
    const json = await response.json();

    // json.machines[0].machine?.url.length !== 0
    json.machines.length !== 0
      ? (mach_name = await getTMName(json.machines[0].machine.url))
      : (mach_name = null);

    // let mach_name = "c";

    return [
      json.accuracy,
      json.power,
      json.type.name,
      json.damage_class.name,
      mach_name ? mach_name.toUpperCase() : null,
    ];
  };

  const getTMName = async (url) => {
    // const machine_url = json.machines[0]?.machine.url;

    // console.log(json.machines[0].machine.url);
    const mach_response = await fetch(url);
    const mach_json = await mach_response.json();
    const mach_name = mach_json.item.name;
    // console.log(mach_json.item.name);
    return mach_name;
  };

  const Move = ({ item }) => {
    let left_box_text =
      item.level_learned > 0 ? "Lv " + item.level_learned : item.mach_name;

    return (
      <View style={styles.moveBox}>
        <View style={styles.move}>
          <View style={[styles.box, { width: "12%", maxWidth: 50 }]}>
            <Text style={{ textAlign: "center" }}>{left_box_text} </Text>
          </View>
          <View style={styles.nameBox}>
            <Text numberOfLines={1} style={{ fontSize: 20 }}>
              {item.move_name}
            </Text>
            <View style={styles.miniImgContainer}>
              <Image style={styles.miniImg} source={images[item.type]} />
              <Image style={styles.miniImg} source={images[item.damageClass]} />
            </View>
          </View>
          <View style={styles.rightSide}>
            <View style={styles.box}>
              <Text style={{ textAlign: "center" }}>{item.power}</Text>
            </View>
            <View style={styles.box}>
              <Text style={{ textAlign: "center" }}>{item.accuracy}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const NoMove = () => {
    return (
      <View
        style={{
          height: Dimensions.get("window").height - 100,
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
          {capitalizeString(pokemonInfo.pokeName)} has no moves that can be
          learned by {methSelect}.
        </Text>
      </View>
    );
  };

  filteredList = moveList.filter((x) => x.method == methSelect);
  filteredListLength = filteredList.length;

  const Body = () => {
    if (loaded) {
      if (filteredList.length > 0) {
        return <FlatList data={filteredList} renderItem={Move} />;
      } else {
        return <NoMove />;
      }
    } else {
      return <LoadingView />;
    }
  };

  // on load
  useEffect(() => {
    getMoves(pokemonInfo.id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selector}>
        <SegmentedButtons
          value={methSelect}
          onValueChange={setMethSelect}
          style={{ width: "100%" }}
          buttons={[
            {
              value: "level-up",
              label: "Level",
              checkedColor: "white",
              uncheckedColor: "black",
              style: {
                backgroundColor: methSelect == "level-up" ? "blue" : "white",
              },
            },
            {
              value: "tutor",
              label: "Tutor",
              checkedColor: "white",
              uncheckedColor: "black",
              style: {
                backgroundColor: methSelect == "tutor" ? "blue" : "white",
              },
            },
            {
              value: "machine",
              label: "TM",
              checkedColor: "white",
              uncheckedColor: "black",
              style: {
                backgroundColor: methSelect == "machine" ? "blue" : "white",
              },
            },
          ]}
        />
      </View>

      <Body />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 40,
    // marginHorizontal: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  miniImg: {
    // height: 20,
    // width: 60,
    marginRight: 5,
    marginLeft: 2,
  },
  miniImgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  moveList: {
    alignItems: "center",
  },
  nameBox: {
    alignItems: "flex-start",
    width: "58%",
    marginLeft: 10,
  },
  rightSide: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  pokemonImg: {
    height: 90,
    width: 90,
    marginHorizontal: 10,
  },
  selector: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "85%",
    // justifyContent: "space-between",
    justifyContent: "center",
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
