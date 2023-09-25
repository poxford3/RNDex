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
import { LinearGradient } from "expo-linear-gradient";

export default function TestView({ navigation }) {
  data = [
    { x: "hp", y: 45 },
    { x: "attack", y: 49 },
    { x: "defense", y: 49 },
    { x: "sp atk", y: 65 },
    { x: "sp def", y: 65 },
    { x: "speed", y: 45 },
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
      <View>
        <LinearGradient
          // Background Linear Gradient
          // colors={["rgba(0,0,0,0.8)", "transparent"]}
          // colors={["blue", "white"]}
          colors={["blue", "blue", "transparent"]}
          style={styles.background}
        />
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>test page (Bulbasaur):</Text>
      <GradientTest />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 100,
    width: 100,
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
});
