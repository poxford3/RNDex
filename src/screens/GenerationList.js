import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import API_CALL from "../hooks/API_CALL";
import capitalizeString, { capitalizeGens } from "../hooks/capitalizeString";
import LoadingView from "../utils/LoadingView";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function GenerationList() {
  const [gens, setGens] = useState([]);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getGens = async () => {
    const url = `https://pokeapi.co/api/v2/generation/`;
    const json = await API_CALL(url);
    let tempGenList = [];
    let tasks = [];

    // console.log(json);
    json.results.map((e) => {
      const task = getGenGames(e.url).then((details) => {
        tempGenList.push({
          genName: capitalizeGens(e.name),
          url: e.url,
          games: details,
        });
      });
      tasks.push(task);
      // console.log(capitalizeGens(e.name));
    });

    // setGens((prevList) => [...prevList, tempGenList]);
    await Promise.all(tasks);
    setGens(tempGenList);
  };

  const getGenGames = async (url) => {
    json = await API_CALL(url);
    let games = [];
    // console.log(json.version_groups[0]);

    json.version_groups.map((e) => {
      games.push({
        game: capitalizeString(e.name),
        url: e.url,
      });
    });

    return games;
  };

  useEffect(() => {
    getGens();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Text>GenerationList</Text>
      {/* <ScrollView> */}
      {gens.length > 0 ? (
        gens.map((gen, idx) => {
          // console.log(gen);
          return (
            <View key={idx}>
              <Text>{gen.genName}</Text>
              <Divider />
            </View>
          );
        })
      ) : (
        <LoadingView />
      )}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  boxCont: {
    alignItems: "center",
    justifyContent: "center",
  },
  boxList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleBox: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  systemBox: {
    width: 300,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "grey",
    borderTopColor: "black",
    borderTopWidth: 40,
    borderRightColor: "white",
    borderRightWidth: 300,
    // position: "absolute",
    // opacity: 0.5,
  },
  selectionImg: {
    height: 88,
    width: 110,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
  },
});
