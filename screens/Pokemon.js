import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";

export default function Pokemon({ route }) {
  const pokemonInfo = route.params;
  const new_sprite = pokemonInfo.spriteData?.other?.home.front_default;
  // console.log(new_sprite);
  const sprite_to_use = new_sprite ? new_sprite : pokemonInfo.sprite;
  // will be view of once pokemon is clicked
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Image
          source={{
            uri: sprite_to_use,
          }}
          style={styles.images}
        />
        {/* <Text>{pokemonInfo.pokeName}</Text> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  images: {
    height: 300,
    width: 300,
  },
});
