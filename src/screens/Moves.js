import React, { useEffect, useState, useContext, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { SegmentedButtons } from "react-native-paper";
import LoadingView from "../utils/LoadingView";
import { Move } from "../utils/Move";
import images from "../../assets/types";
import themeColors from "../styles/themeColors";
import capitalizeString from "../hooks/capitalizeString.js";
import MissingInfo from "../utils/MissingInfo";
import type_colors from "../../assets/types/type_colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";

export default function Moves() {
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const [methSelect, setMethSelect] = useState("level-up");
  const [moveList, setMoveList] = useState([]);
  const [mainColor, setMainColor] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getMoves = async (id) => {
    let tempMoveList = [];
    let tasks = [];
    setLoaded(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const json = await response.json();

    setMainColor(type_colors[json.types[0].type.name]);

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
    const mach_response = await fetch(url);
    const mach_json = await mach_response.json();
    const mach_name = mach_json.item.name;
    // console.log(mach_json.item.name);
    return mach_name;
  };

  filteredList = moveList.filter((x) => x.method == methSelect);
  filteredListLength = filteredList.length;

  const Body = () => {
    if (loaded) {
      if (filteredList.length > 0) {
        return (
          <FlatList
            data={filteredList}
            initialNumToRender={20}
            renderItem={({ item }) => {
              return <Move item={item} />;
            }}
            maxToRenderPerBatch={10}
          />
        );
      } else {
        return (
          <MissingInfo
            str={`${capitalizeString(
              pokemonInfo.pokeName
            )} has no moves that can be
        learned by ${methSelect}`}
            id={pokemonInfo.id}
          />
        );
      }
    } else {
      return <LoadingView />;
    }
  };

  // on load
  useEffect(() => {
    getMoves(pokemonInfo.id);
  }, [pokemonInfo]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.selector}>
        <SegmentedButtons
          value={methSelect}
          onValueChange={setMethSelect}
          style={{ width: "100%" }}
          buttons={[
            {
              value: "level-up",
              label: "Level",
              checkedColor: activeColors.selectorActive,
              uncheckedColor: activeColors.selectorInactive,
              style: {
                backgroundColor:
                  methSelect == "level-up"
                    ? mainColor
                    : activeColors.background,
              },
            },
            {
              value: "tutor",
              label: "Tutor",
              checkedColor: activeColors.selectorActive,
              uncheckedColor: activeColors.selectorInactive,
              style: {
                backgroundColor:
                  methSelect == "tutor" ? mainColor : activeColors.background,
              },
            },
            {
              value: "machine",
              label: "TM",
              checkedColor: activeColors.selectorActive,
              uncheckedColor: activeColors.selectorInactive,
              style: {
                backgroundColor:
                  methSelect == "machine" ? mainColor : activeColors.background,
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
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  moveList: {
    alignItems: "center",
  },
  nameBox: {
    alignItems: "flex-start",
    width: "58%",
    marginLeft: 10,
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
