import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Moves() {
  const [methSelect, setMethSelect] = useState("level");
  const [selected, setSelected] = useState(true);

  const moveItems = [
    {
      method: "level",
      req: 13,
      name: "Vine Whip",
      damageClass: "Physical",
      power: 50,
      accuracy: 100,
    },
    {
      method: "level",
      req: 16,
      name: "attack",
      damageClass: "Special",
      power: 50,
      accuracy: "-",
    },
    {
      method: "machine",
      req: "HM01",
      name: "Cut",
      damageClass: "Physical",
      power: 40,
      accuracy: 100,
    },
    {
      method: "machine",
      req: "HM02",
      name: "Flash",
      damageClass: "Special",
      power: "-",
      accuracy: "-",
    },
  ];

  const Move = ({ item }) => {
    return (
      <View style={styles.move}>
        <Text>
          {item.req} {item.name}
        </Text>
        <Text>{item.damageClass}</Text>
        <Text>
          {item.power} {item.accuracy}
        </Text>
      </View>
    );
  };

  const Selector = ({ method, text, selected }) => {
    const bkgColor = selected ? "blue" : "white";
    return (
      <TouchableOpacity
        style={[styles.selectorBox, { backgroundColor: bkgColor }]}
        onPress={() => {
          setMethSelect(method);
          setSelected(!selected);
        }}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selector}>
        <Selector method={"level"} text={"Level"} selected={selected} />
        <Selector method={"machine"} text={"TM"} selected={!selected} />
      </View>
      <FlatList
        data={moveItems.filter((x) => x.method == methSelect)}
        renderItem={Move}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  move: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  selector: {
    paddingTop: 10,
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
  },
  selectorBox: {
    height: 30,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
});
