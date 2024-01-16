import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
// import {
//   VictoryChart,
//   VictoryGroup,
//   VictoryBar,
//   VictoryPie,
//   VictoryLabel,
//   VictoryAxis,
// } from "victory-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
// import { Tooltip, Provider } from "react-native-paper";
import { Tooltip } from "react-native-elements";
// app_glyphmaps_materialcommunityicons.json
import { Svg } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { List } from "react-native-paper";
import themeColors from "../styles/themeColors";
import CustomDivider from "../utils/CustomDivider";
import box_art from "../../assets/box_art";

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

  // const ChartTest = () => {
  //   return (
  //     <VictoryChart>
  //       <VictoryGroup>
  //         <VictoryBar
  //           data={data}
  //           style={{
  //             data: { fill: "blue", stroke: "black", strokeWidth: 2 },
  //             labels: { fill: "white" },
  //           }}
  //         />
  //       </VictoryGroup>
  //     </VictoryChart>
  //   );
  // };

  // const ChartTest2 = () => {
  //   return (
  //     <VictoryChart
  //       domainPadding={10}
  //       padding={{ left: 60, top: 30, right: 30, bottom: 60 }}
  //     >
  //       <VictoryLabel
  //         labelPlacement="parallel"
  //         label="Center me"
  //         style={{
  //           fill: "white",
  //         }}
  //       />
  //       <VictoryAxis
  //         dependentAxis
  //         label={"(Max 255)"}
  //         orientation={"bottom"}
  //         domain={[0, 255]}
  //         style={{
  //           axisLabel: {
  //             fill: "white",
  //           },
  //           tickLabels: {
  //             fill: "white",
  //           },
  //           axisLabel: {
  //             marginTop: 5,
  //           },
  //         }}
  //       />
  //       <VictoryAxis
  //         independentAxis
  //         orientation={"left"}
  //         style={{
  //           tickLabels: {
  //             fill: "white",
  //           },
  //         }}
  //       />
  //       <VictoryBar
  //         data={data}
  //         // domain={{ y: [0, 255] }}
  //         horizontal={true}
  //         // width={{}} // use this !!
  //         labels={({ datum }) => datum.y}
  //         alignment="middle"
  //         style={{
  //           data: {
  //             fill: "blue",
  //           },
  //         }}
  //       />
  //     </VictoryChart>
  //   );
  // };

  // const GradientTest = () => {
  //   return (
  //     <View style={styles.gradient}>
  //       <LinearGradient
  //         // Background Linear Gradient
  //         // colors={["rgba(0,0,0,0.8)", "transparent"]}
  //         // colors={["blue", "white"]}
  //         colors={["blue", "blue", "transparent", "transparent", "transparent"]}
  //         style={styles.background}
  //       >
  //         <Image
  //           source={require("../../assets/rndex_logo.jpeg")}
  //           style={{ height: 300, width: 300 }}
  //         />
  //       </LinearGradient>
  //       <LinearGradient
  //         start={{ x: 0.0, y: 0.25 }}
  //         end={{ x: 0.5, y: 1.0 }}
  //         locations={[0, 0.5, 0.6]}
  //         colors={["#4c669f", "#3b5998", "#192f6a"]}
  //         style={styles.linearGradient}
  //       >
  //         <Text style={styles.buttonText}>Sign in with Facebook</Text>
  //       </LinearGradient>
  //     </View>
  //   );
  // };

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

  const pokemonTestFilter = pokemonTest.filter((x) => x.gen.includes(value));

  // const PieChartTest = () => {
  //   const dispText = `Gender Rates\nFemale: 65%\nMale: 35%`;
  //   const dispText1 = `Female: 65%\nMale 35%`;
  //   return (
  //     <View>
  //       {/* <VictoryPie data={data} /> */}
  //       {/* <Text style={{ textAlign: "center" }}>Gender Rates</Text> */}
  //       <Svg width={300} height={300}>
  //         <VictoryPie
  //           standalone={false}
  //           data={genders}
  //           width={300}
  //           height={300}
  //           innerRadius={60}
  //           colorScale={["blue", "pink"]}
  //           labels={({}) => null}
  //         />
  //         <VictoryLabel
  //           text={dispText}
  //           textAnchor={"middle"}
  //           style={{ fontSize: 16 }}
  //           x={150}
  //           y={150}
  //         />
  //       </Svg>
  //     </View>
  //   );
  // };

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

  const games = [
    { game: "Red", selected: false },
    { game: "Blue", selected: false },
    { game: "Yellow", selected: false },
    { game: "Black", selected: false },
    { game: "X", selected: false },
  ];
  // logic from
  // https://stackoverflow.com/questions/58796034/how-to-multiselect-items-in-flatlist-react-native
  const [gameSelected, setGameSelected] = useState(games);
  const [gameFilter, setGameFilter] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const ModalTest = () => {
    return (
      <View
        style={{
          width: 200,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: activeColors.textColor,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text
            style={{
              color: activeColors.textColor,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Filter
          </Text>
          <MaterialCommunityIcons
            name={selectAll ? "circle" : "circle-outline"}
            size={24}
            color={activeColors.textColor}
            onPress={() => {
              setSelectAll(!selectAll);
              let newGameSelected = [...gameSelected];
              for (let gameItem of newGameSelected) {
                gameItem.selected = !selectAll;
              }
              setGameSelected(newGameSelected);
            }}
          />
        </View>
        <CustomDivider direction={"horizontal"} />
        <FlatList
          data={gameSelected}
          keyExtractor={(item, idx) => idx.toString()}
          scrollEnabled={false}
          renderItem={renderGameList}
        />
        <TouchableOpacity
          onPress={() => {
            setGameFilter(gameSelected.filter((e) => e.selected));
          }}
        >
          <Text
            style={{
              color: activeColors.textColor,
              textDecorationLine: "underline",
              textAlign: "center",
            }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderGameList = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => {
          let newGameSelected = [...gameSelected];
          for (let gameItem of newGameSelected) {
            if (gameItem.game == item.game) {
              gameItem.selected = gameItem.selected == true ? false : true;
              break;
            }
          }
          // console.log("ngs", newGameSelected);
          setGameSelected(newGameSelected);
        }}
      >
        <Text style={{ color: activeColors.textColor }}>{item.game}</Text>
        <MaterialCommunityIcons
          name={item.selected == true ? "circle" : "circle-outline"}
          size={20}
          color={activeColors.textColor}
        />
      </TouchableOpacity>
    );
  };

  const ModalResults = () => {
    const gamesShown = gameFilter.length > 0 ? gameFilter : games;
    console.log("gameShown", gamesShown);
    return (
      <View
        style={{
          borderColor: "white",
          borderWidth: 1,
          marginTop: 20,
          padding: 10,
        }}
      >
        <FlatList
          data={gamesShown}
          // extraData={gameSelected}
          scrollEnabled={false}
          style={{ flexGrow: 0 }}
          renderItem={renderResults}
        />
      </View>
    );
  };

  const renderResults = ({ item }) => {
    // console.log("item", item);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 100,
        }}
      >
        <Text style={{ color: activeColors.textColor }}>{item.game}</Text>
        <Text style={{ color: activeColors.textColor }}>
          {item.selected == true ? "true" : "false"}
        </Text>
      </View>
    );
  };

  const ToolTipFun = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: activeColors.textColor }}>test test</Text>
        <Tooltip
          popover={
            <Text style={{ color: activeColors.textColor }}>
              hi jonas {"<3"}
            </Text>
          }
        >
          <MaterialCommunityIcons
            name={"information"}
            size={30}
            color={activeColors.textColor}
          />
        </Tooltip>
      </View>
    );
  };

  const imgList = Object.values(box_art).slice(0, 3);
  // let imgList = Object.fromEntries(Object.entries(box_art).slice(0, 3));
  // let imgList = [{ id: 20 }, { id: 19 }, { id: 21 }];

  // console.log("img list", imgList);
  const [screenIndex, setScreenIndex] = useState(0);

  const screenWidth = Dimensions.get("window").width;

  const ImageIGList = () => {
    return (
      <View
        style={{
          height: "90%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Image source={imgList[1]} style={{ height: 150, width: 150 }} /> */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth}
          pagingEnabled
          decelerationRate={"fast"}
          directionalLockEnabled={true}
          disableIntervalMomentum={true}
          alwaysBounceHorizontal={true}
          style={{ height: "90%" }}
          scrollEventThrottle={45}
          onScroll={(e) => {
            let slide = Math.round(
              e.nativeEvent.contentOffset.x /
                e.nativeEvent.layoutMeasurement.width
            );
            if (e.nativeEvent.contentOffset.x % screenWidth == 0) {
              setScreenIndex(e.nativeEvent.contentOffset.x / screenWidth);
              // setScreenIndex(slide + 1);
            }
            // if (slide !== screenIndex) {
            //   setScreenIndex(slide);
            // }
          }}
        >
          {imgList.map((img, idx) => {
            return (
              <View
                key={idx}
                style={{
                  width: screenWidth,
                  height: 300,
                  alignItems: "center",
                  justifyContent: "center",
                  // borderWidth: 1,
                  // borderColor: "grey",
                }}
              >
                <Image source={img.id} style={{ height: 150, width: 150 }} />
              </View>
            );
          })}
        </ScrollView>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
              alignSelf: "center",
              zIndex: 8,
              elevation: 8,
              position: "absolute",
              bottom: 20,
            }}
          >
            {imgList.map((img, idx) => {
              console.log("idx screenIndex", idx, screenIndex);
              return (
                <View
                  key={idx}
                  style={{
                    backgroundColor: idx == screenIndex ? "purple" : "grey",
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    margin: 2,
                  }}
                ></View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const ImageIGList3 = () => {
    return (
      <>
        <View
          style={{
            height: "90%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 24 }}>header</Text>
          <SwiperFlatList
            showPagination
            index={screenIndex}
            style={{ borderWidth: 1, borderColor: "grey" }}
            onChangeIndex={(idx) => {
              // console.log(idx.index);
              setScreenIndex(idx.index);
            }}
            paginationStyle={{
              marginBottom: 15,
            }}
            paginationStyleItemActive={{
              backgroundColor: "green",
              height: 10,
              width: 10,
            }}
            paginationStyleItemInactive={{
              backgroundColor: "grey",
              height: 10,
              width: 10,
            }}
          >
            <View
              style={{
                width: screenWidth,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={19} style={{ height: 150, width: 150 }} />
            </View>
            <View
              style={{
                width: screenWidth,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={20} style={{ height: 150, width: 150 }} />
            </View>
            <View
              style={{
                width: screenWidth,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={21} style={{ height: 150, width: 150 }} />
            </View>
          </SwiperFlatList>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: screenWidth * 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onPress={() => {
                  setScreenIndex(0);
                }}
                title="go to first"
              />
            </View>
            <View
              style={{
                width: screenWidth * 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onPress={() => {
                  setScreenIndex(2);
                }}
                title="go to last"
              />
            </View>
          </View>
        </View>
        <Text style={{ color: "white" }}>{screenIndex}</Text>
      </>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <ImageIGList3 />
    </SafeAreaView>
  );
}

{
  /* <ModalTest />
<ModalResults /> */
}
{
  /* <Text>test page (Bulbasaur):</Text> */
}
{
  /* {gens.map((e, idx) => {
  return <ListTest game={e.name} games={e.games} key={idx} />;
})} */
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
