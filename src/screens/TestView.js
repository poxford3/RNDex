import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import genList from ".../assets/generations.js";
// import { genList } from ".../assets/generations.js";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryPie,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// mat com icons file:
// app_glyphmaps_materialcommunityicons.json
import { Svg } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { List } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import themeColors from "../styles/themeColors";
// react-native-charts-wrapper
// import { PieChart } from "react-native-charts-wrapper";

export default function TestView() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [heartToggle, setHeartToggle] = useState(false);
  const themeChoose = "dark";
  const typeColor = "#F8D030";
  const activeColors = themeColors[themeChoose];
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
    { x: "extra", y: 50 },
  ];

  const genders = [
    { x: "male", y: 35 },
    { x: "female", y: 65 },
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
      <VictoryChart>
        <VictoryGroup>
          <VictoryBar
            data={data}
            style={{
              data: { fill: "blue", stroke: "black", strokeWidth: 2 },
              labels: { fill: "white" },
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    );
  };

  const ChartTest2 = () => {
    return (
      <VictoryChart
        domainPadding={10}
        padding={{ left: 60, top: 30, right: 30, bottom: 60 }}
      >
        <VictoryLabel
          labelPlacement="parallel"
          label="Center me"
          style={{
            fill: "white",
          }}
        />
        <VictoryAxis
          dependentAxis
          label={"(Max 255)"}
          orientation={"bottom"}
          domain={[0, 255]}
          style={{
            axisLabel: {
              fill: "white",
            },
            tickLabels: {
              fill: "white",
            },
            axisLabel: {
              marginTop: 5,
            },
          }}
        />
        <VictoryAxis
          independentAxis
          orientation={"left"}
          style={{
            tickLabels: {
              fill: "white",
            },
          }}
        />
        <VictoryBar
          data={data}
          // domain={{ y: [0, 255] }}
          horizontal={true}
          // width={{}} // use this !!
          labels={({ datum }) => datum.y}
          alignment="middle"
          style={{
            data: {
              fill: "blue",
            },
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

  // useEffect(() => {
  //   // console.log(value);
  //   console.log("filter", pokemonTestFilter);
  //   // console.log("dropdownvalues", dropdownValues);
  // }, [value]);

  const PieChartTest = () => {
    const dispText = `Gender Rates\nFemale: 65%\nMale: 35%`;
    const dispText1 = `Female: 65%\nMale 35%`;
    return (
      <View>
        {/* <VictoryPie data={data} /> */}
        {/* <Text style={{ textAlign: "center" }}>Gender Rates</Text> */}
        <Svg width={300} height={300}>
          <VictoryPie
            standalone={false}
            data={genders}
            width={300}
            height={300}
            innerRadius={60}
            colorScale={["blue", "pink"]}
            labels={({}) => null}
          />
          <VictoryLabel
            text={dispText}
            textAnchor={"middle"}
            style={{ fontSize: 16 }}
            x={150}
            y={150}
          />
        </Svg>
      </View>
    );
  };

  const DataViewTest = () => {
    return (
      <View
        style={[
          infoStyle.section,
          { backgroundColor: activeColors.background, borderColor: typeColor },
        ]}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              infoStyle.header,
              { backgroundColor: activeColors.accent, borderColor: typeColor },
            ]}
          >
            <Text style={[infoStyle.headerText, { color: typeColor }]}>
              INfo :)
            </Text>
          </View>
        </View>
        <View style={infoStyle.infoSection}>
          <View style={infoStyle.row}>
            <View style={infoStyle.infoItem}>
              <MaterialCommunityIcons
                name="scale-bathroom"
                size={20}
                color={typeColor}
              />
              <Text style={[infoStyle.info, { color: activeColors.textColor }]}>
                1000 kg
              </Text>
            </View>
            {/* <PokeGenderPieChart typeColor={"green"} genders={genders} /> */}
            <View style={infoStyle.infoItem}>
              <Text style={[infoStyle.info, { color: activeColors.textColor }]}>
                1000 m
              </Text>
              <MaterialCommunityIcons
                name="ruler"
                size={20}
                color={typeColor}
              />
            </View>
          </View>
          <View style={infoStyle.row}>
            <View style={infoStyle.infoItem}>
              <MaterialCommunityIcons
                name="chart-line"
                size={20}
                color={typeColor}
              />
              <Text style={[infoStyle.info, { color: activeColors.textColor }]}>
                Growth Rate
              </Text>
            </View>
            <View style={infoStyle.infoItem}>
              <Text style={[infoStyle.info, { color: activeColors.textColor }]}>
                Egg Group
              </Text>
              <MaterialCommunityIcons
                name="language-cpp"
                size={20}
                color={typeColor}
              />
            </View>
          </View>
          <View style={infoStyle.row}>
            <TypeEffecLister />
          </View>
        </View>
      </View>
    );
  };

  const TypeEffecLister = () => {
    return (
      <View style={{ flexDirection: "row", flexGrow: 1 }}>
        <FlatList
          data={data}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: "33%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 3,
                }}
              >
                <Image
                  source={require("../../assets/types/dragon.png")}
                  style={{ height: 20, width: 60, marginRight: 3 }}
                />
                <Text style={{ color: activeColors.textColor }}>{item.x}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const HeartTest = () => {
    let { nameShow, colorShow } = heartToggle
      ? { nameShow: "heart", colorShow: "red" }
      : { nameShow: "heart-outline", colorShow: "grey" };
    // const colorShow = heartToggle
    return (
      <TouchableOpacity
        style={styles.heart}
        onPress={() => {
          nameShow = "heart-broken";
          setHeartToggle(!heartToggle);
        }}
      >
        <MaterialCommunityIcons name={nameShow} color={colorShow} size={30} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <DataViewTest />
      <HeartTest />
      {/* <Text>test page (Bulbasaur):</Text> */}
      {/* {gens.map((e, idx) => {
        return <ListTest game={e.name} games={e.games} key={idx} />;
      })} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
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
    // backgroundColor: "#15202b",
  },
  heart: {
    position: "absolute",
    zIndex: 1000,
    top: 10,
    right: 10,
  },
  gradient: {
    width: "100%",
  },
});

// const infoBG = "#eee8f5";
// const infoBG = "#8899ac";
const infoStyle = StyleSheet.create({
  header: {
    height: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 3,
    position: "absolute",
    top: -35,
    // backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
  },
  infoSection: {
    paddingTop: 15,
    paddingHorizontal: 10,
    // flexDirection: "row",
  },
  infoItem: {
    flexDirection: "row",
  },
  row: {
    paddingVertical: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    width: "85%",
    borderWidth: 3,
    // borderColor: "green",
    borderRadius: 10,
    padding: 10,
  },
});
