import React, { useEffect } from "react";
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

export default function TestView({ navigation }) {
  data = [
    { x: "hp", y: 45 },
    { x: "attack", y: 49 },
    { x: "defense", y: 49 },
    { x: "sp atk", y: 65 },
    { x: "sp def", y: 65 },
    { x: "speed", y: 45 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text>test page (Bulbasaur):</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
