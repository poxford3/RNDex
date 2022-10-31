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
import { genList } from "../assets/generations";

export default function TestView({ navigation }) {
  // useEffect(() => {

  // }, []);

  // const genList = [
  //   {
  //     text: "one",
  //   },
  //   {
  //     text: "two",
  //   },
  //   {
  //     text: "three",
  //   },
  // ];

  return (
    <SafeAreaView style={styles.container}>
      <Text>test page:</Text>
      <View style={styles.list}>
        <FlatList
          data={genList}
          // horizontal={true}
          renderItem={({ item }) => {
            <View style={styles.listItem}>
              <Image
                source={require("../assets/arse.jpeg")}
                style={styles.images}
              />
              <Text>{item.text}</Text>
              <Text>ahhhh</Text>
            </View>;
          }}
        />
      </View>
      <FlatList
        data={genList}
        numColumns={2}
        initialNumToRender={20}
        renderItem={({ item }) => (
          <View style={styles.outerBox}>
            <TouchableOpacity style={styles.innerBox}>
              <Image
                source={require("../assets/arse.jpeg")}
                style={styles.images}
              />
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text>post test</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    height: 200,
    width: "100%",
    borderWidth: 1,
    margin: 10,
  },
  listItem: {
    backgroundColor: "lightgrey",
    height: 50,
  },
});
