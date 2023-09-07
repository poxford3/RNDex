import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function APITest() {
  const [pokeList, setPokeList] = useState([]);
  const [limit, setLimit] = useState(150);
  const [offset, setOffset] = useState(0);

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  console.log(url);

  // const getPokeInformation = async () => {
  //   const response = await fetch(url);
  //   const json = await response.json();

  //   // console.log(json.results);
  //   json.results.forEach((e) => {
  //     // console.log(e.name);
  //     let nameT = getPokeDetails(e);
  //     setPokeList([...pokeList, { pokeName: nameT }]);
  //   });
  // };

  // const getPokeDetails = async (pokemon) => {
  //   let url_poke = pokemon.url;
  //   const response2 = await fetch(url_poke);
  //   const json2 = await response2.json();

  //   // setPokeList([...pokeList, { pokeName: json2.name }]);
  //   return json2.name;
  // };

  const getPokeInformation = async () => {
    const response = await fetch(url);
    const json = await response.json();

    let tempPokeList = []; // Temporary array to hold values
    const tasks = []; // To hold promises

    json.results.forEach((e) => {
      const task = getPokeDetails(e).then((details) => {
        tempPokeList.push(details);
      });
      tasks.push(task);
    });

    await Promise.all(tasks); // Ensure all async operations are completed before setting the state
    setPokeList((prevList) => [...prevList, ...tempPokeList]);
  };

  const getPokeDetails = async (pokemon) => {
    let url_poke = pokemon.url;
    const response2 = await fetch(url_poke);
    const json2 = await response2.json();

    return {
      pokeName: json2.name,
      id: json2.id,
    }; // Return the new value
  };

  useEffect(() => {
    getPokeInformation();
  }, []);

  return (
    <View style={styles.body}>
      <Text>APITest</Text>
      <View style={styles.list}>
        <FlatList
          data={pokeList.sort((a, b) => a.id - b.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <View>
              <Text style={{ padding: 10 }}>{item.pokeName}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  container: {
    flex: 1,
  },
  images: {
    height: 300,
    width: 300,
  },
  list: {
    width: "90%",
    height: "75%",
    alignItems: "center",
  },
});
