import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-paper";
import API_CALL from "../functions/API_CALL";
import capitalizeString, {
  capitalizeGens,
} from "../functions/capitalizeString";
import LoadingView from "../utils/LoadingView";

export default function GenerationList() {
  const [gens, setGens] = useState([]);

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
    <View>
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
