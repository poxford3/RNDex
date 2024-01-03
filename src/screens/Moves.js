import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import LoadingView from "../utils/LoadingView";
import { Move } from "../utils/Move";
import themeColors from "../styles/themeColors";
import capitalizeString from "../hooks/capitalizeString.js";
import MissingInfo from "../utils/MissingInfo";
import type_colors from "../../assets/types/type_colors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import API_CALL from "../hooks/API_CALL";

export default function Moves({ navigation }) {
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const [methSelect, setMethSelect] = useState(null);
  const [moveList, setMoveList] = useState([]);
  const [moveMethods, setMoveMethods] = useState([""]);
  const [mainColor, setMainColor] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const handleMethodChange = (method) => {
    let newMoveMeth = moveMethods;
    // gets current method
    let obj = newMoveMeth.find((x) => x.value === method);
    // gets location of where the method is in the list
    let index = newMoveMeth.indexOf(obj);
    // goes throught the method list and sets each one's background
    // depending on whether or not its selected
    for (let i = 0; i < newMoveMeth.length; i++) {
      if (i == index) {
        newMoveMeth[i] = {
          ...newMoveMeth[i],
          style: { backgroundColor: mainColor },
        };
      } else {
        newMoveMeth[i] = {
          ...newMoveMeth[i],
          style: { backgroundColor: activeColors.background },
        };
      }
    }

    setMethSelect(method);
  };

  const getMoves = async (id) => {
    let tempMoveList = [];
    let tasks = [];
    setLoaded(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const json = await API_CALL(url);

    setMainColor(type_colors[json.types[0].type.name]);

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
        move_obj.desc = detail[5];
        move_obj.genIntroduced = detail[6];
        move_obj.pp = detail[7];
        move_obj.target = detail[8];
        move_obj.contest_type = detail[9];
        move_obj.pokemon = detail[10];

        tempMoveList.push(move_obj);
      });
      tasks.push(task);
    });

    await Promise.all(tasks);
    // get unique methods for moves
    const uniqueMoveTypes = [
      ...new Set(tempMoveList.map((item) => item.method)),
    ].sort();

    // turn unique methods into object to put into button
    let uniqueMoveObj = uniqueMoveTypes.map((method, idx) => ({
      value: method,
      label: capitalizeString(method),
      checkedColor: activeColors.selectorActive,
      uncheckedColor: activeColors.selectorInactive,
      style: {
        backgroundColor:
          method == "level-up"
            ? type_colors[json.types[0].type.name]
            : activeColors.background,
      },
    }));

    const methSortOrder = [
      "level-up",
      "machine",
      "egg",
      "tutor",
      "stadium-surfing-pikachu",
    ];

    uniqueMoveObj.sort(
      (a, b) => methSortOrder.indexOf(a.value) - methSortOrder.indexOf(b.value)
    );

    setMethSelect(uniqueMoveObj[0].value);
    setMoveMethods(uniqueMoveObj);
    setMoveList(tempMoveList.sort((a, b) => a.level_learned - b.level_learned));
    setLoaded(true);
  };

  const getMoveDetails = async (url) => {
    const json = await API_CALL(url);

    json.machines.length !== 0
      ? (mach_name = await getTMName(json.machines[0].machine.url))
      : (mach_name = null);

    let arr = json.flavor_text_entries.filter(
      (elem) => elem.language.name == "en"
    ); // gets most recent english description

    let description = arr.pop();

    return [
      json.accuracy,
      json.power,
      json.type.name,
      json.damage_class.name,
      mach_name ? mach_name.toUpperCase() : null,
      description?.flavor_text.replaceAll("\n", " "),
      json.generation.name,
      json.pp,
      json.target.name,
      json.contest_type?.name,
      json.learned_by_pokemon,
    ];
  };

  const getTMName = async (url) => {
    const mach_json = await API_CALL(url);
    const mach_name = mach_json.item.name;
    return mach_name;
  };

  filteredList = moveList.filter((x) => x.method == methSelect);
  filteredListLength = filteredList.length;

  const Body = () => {
    if (filteredList.length > 0) {
      return (
        <FlatList
          data={filteredList}
          initialNumToRender={20}
          renderItem={({ item }) => {
            return (
              <Move item={item} navigation={navigation} mainColor={mainColor} />
            );
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
  };

  // on load
  useEffect(() => {
    getMoves(pokemonInfo.id);
  }, [pokemonInfo]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {loaded ? (
        <>
          <View style={styles.selector}>
            <SegmentedButtons
              value={methSelect}
              onValueChange={handleMethodChange}
              style={{ width: "100%" }}
              buttons={moveMethods}
              label={"test"}
            />
          </View>
          <Body />
        </>
      ) : (
        <LoadingView />
      )}
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
