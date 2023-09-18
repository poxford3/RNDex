import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Evolutions({ route }) {
  console.log("evol names?", route?.params);
  let pokemon1 = "Pikachu";
  let pokemon2 = "Raichu";
  let level = 20;

  const EvolChain = ({ pokemon1, pokemon2, level }) => {
    return (
      <View style={styles.evolContainer}>
        <View style={{ alignItems: "flex-start", width: "85%", padding: 5 }}>
          <Text style={{ fontSize: 28 }}>Level {level}</Text>
        </View>
        <View style={styles.pictureBox}>
          <View>
            <Image
              style={styles.pokemonImg}
              source={require("/Users/poxford3/RNDex/assets/favicon.png")}
            />
            <Text style={styles.pokeName}>{pokemon1}</Text>
          </View>
          <Ionicons name="arrow-forward-outline" size={40} />
          <View>
            <Image
              style={styles.pokemonImg}
              source={require("/Users/poxford3/RNDex/assets/arse.jpeg")}
            />
            <Text style={styles.pokeName}>{pokemon2}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
      <Text style={{ fontWeight: "bold", fontSize: 32, padding: 10 }}>
        Evolutions
      </Text>
      <EvolChain pokemon1={pokemon1} pokemon2={pokemon2} level={20} />
      <EvolChain pokemon1={pokemon1} pokemon2={pokemon2} level={30} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  evolContainer: {
    // height: 80,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  pictureBox: {
    width: "85%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "lightgrey",
    borderRadius: 10,
  },
  pokeName: {
    fontSize: 24,
    textAlign: "center",
  },
  pokemonImg: {
    height: 90,
    width: 90,
    marginHorizontal: 10,
  },
});
