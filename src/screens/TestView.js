import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
// import genList from ".../assets/generations.js";
// import { genList } from ".../assets/generations.js";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryPolarAxis,
} from "victory-native";
import { LinearGradient } from "expo-linear-gradient";
import { List } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

export default function TestView({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: "Fruit", value: "fruit" },
  //   { label: "Apple", value: "apple", parent: "fruit" },
  //   { label: "Banana", value: "banana", parent: "fruit" },
  //   { label: "Orange", value: "orange", parent: "fruit" },
  //   { label: "Pear", value: "pear", parent: "fruit" },
  //   { label: "Other", value: "other" },
  //   { label: "Peas", value: "peas", parent: "other" },
  //   { label: "Leng", value: "leng", parent: "other" },
  // ]);
  const [items, setItems] = useState([
    { label: "Gen1", value: "gen1" },
    { label: "Gen2", value: "gen2" },
    { label: "Gen3", value: "gen3" },
    { label: "Gen4", value: "gen4" },
    { label: "Gen5", value: "gen5" },
  ]);

  const pokemonTest = [
    {
      mee: "pikachu",
      gen: "gen1",
    },
    {
      mee: "pikachu",
      gen: "gen3",
    },
    {
      mee: "pikachu",
      gen: "gen5",
    },
  ];

  const data = [
    { x: "hp", y: 45 },
    { x: "attack", y: 49 },
    { x: "defense", y: 49 },
    { x: "sp atk", y: 65 },
    { x: "sp def", y: 65 },
    { x: "speed", y: 45 },
  ];

  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const gens = [
    {
      name: "gen1",
      games: [
        {
          game: "red blue",
          key: 1,
        },
        {
          game: "yellow",
          key: 2,
        },
      ],
    },
    {
      name: "gen2",
      games: [
        {
          game: "gold silver",
          key: 3,
        },
        {
          game: "crystal",
          key: 4,
        },
      ],
    },
  ];

  const ChartTest = () => {
    return (
      <VictoryChart polar>
        <VictoryPolarAxis
          style={{ axis: { stroke: "none" } }}
        ></VictoryPolarAxis>
        <VictoryBar
          data={data}
          style={{
            data: { fill: "blue", stroke: "black", strokeWidth: 2 },
          }}
        />
      </VictoryChart>
    );
  };

  const GradientTest = () => {
    return (
      <View style={styles.gradient}>
        <LinearGradient
          // Background Linear Gradient
          // colors={["rgba(0,0,0,0.8)", "transparent"]}
          // colors={["blue", "white"]}
          colors={["blue", "blue", "transparent", "transparent", "transparent"]}
          style={styles.background}
        >
          <Image
            source={require("../../assets/arse.jpeg")}
            style={{ height: 300, width: 300 }}
          />
        </LinearGradient>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5, 0.6]}
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.linearGradient}
        >
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </LinearGradient>
      </View>
    );
  };

  const ListTest = ({ game, games }) => {
    return (
      <View>
        <List.Section>
          <List.Accordion
            style={{ width: 300 }}
            title={game}
            left={(props) => <List.Icon {...props} icon="duck" />}
            expanded={expanded}
            onPress={handlePress}
          >
            {games.map((e, idx) => {
              return <List.Item title={e.game} key={idx} />;
            })}
          </List.Accordion>
        </List.Section>
      </View>
    );
  };

  // const dropdownValues = items.filter((x) =>
  //   x.value.includes(pokemonTest.pikachu.gens)
  // );
  const pokemonTestFilter = pokemonTest.filter((x) => x.gen.includes(value));

  const DropdownTest = () => {
    return (
      <View style={{ width: "50%" }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          multiple={true}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Game select"
          multipleText="You have selected"
          searchPlaceholder={"Game Search..."}
          // style={{ borderColor: "blue", backgroundColor: "grey" }}
          // textStyle={{ color: "white" }}
          // dropDownContainerStyle={{
          //   borderColor: "blue",
          //   backgroundColor: "grey",
          // }}
          theme="DARK"
          // theme="LIGHT"
          mode="BADGE"
          badgeDotColors={["green"]}
          scrollViewProps={{ persistentScrollbar: true }}
          itemSeparator={true}
          // itemSeparatorStyle={{ backgroundColor: "blue" }}
          loading={true}
          // onSelectItem={(item) => {
          //   console.log(item);
          // }}
          // searchable={items.length > 5}
          // closeAfterSelecting={false}
          // language={"ES"}
        />
        <Text></Text>
        {pokemonTestFilter.map((gen, idx) => {
          return (
            <Text key={idx} style={{ color: "black" }}>
              {gen}
            </Text>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    // console.log(value);
    console.log("filter", pokemonTestFilter);
    // console.log("dropdownvalues", dropdownValues);
  }, [value]);

  // doesn't work...
  // const filteredData = items.filter((x) => value.includes(x.value));
  // const filteredData = items.filter((x) => console.log(x.parent));
  // console.log("filtered", filteredData);

  return (
    <SafeAreaView style={styles.container}>
      <Text>test page (Bulbasaur):</Text>
      {/* {gens.map((e, idx) => {
        return <ListTest game={e.name} games={e.games} key={idx} />;
      })} */}
      <DropdownTest />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    // width: 100,
    width: "100%",
    margin: 10,
  },
  button: {
    height: 80,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: "100%",
  },
});
