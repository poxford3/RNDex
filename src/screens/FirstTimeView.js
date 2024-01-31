import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Button,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import AppearanceSetting from "../utils/SettingsComponents/AppearanceSetting";
import PokeIconSetting from "../utils/SettingsComponents/PokeIconSetting";
import { PokemonItem } from "../utils/PokemonComponents/PokemonItem";
import { storeData } from "../config/asyncStorage";

const screenWidth = Dimensions.get("window").width;

export default function FirstTimeView({ navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [screenIndex, setScreenIndex] = useState(0);

  const handleFinishSetup = () => {
    storeData("first_time", "completed");
    navigation.navigate("Pokedex");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: activeColors.textColor }]}>
          Welcome to the React Native Pokédex! (RNDex)
        </Text>
        <Text
          style={{
            color: activeColors.textColor,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Swipe through to personalize your experience!
        </Text>
      </View>
      <View style={styles.swiperView}>
        <SwiperFlatList
          showPagination
          index={screenIndex}
          onChangeIndex={(idx) => {
            setScreenIndex(idx.index);
          }}
          paginationStyle={{
            marginBottom: 7,
          }}
          paginationStyleItemActive={[
            styles.paginationIcon,
            { backgroundColor: "purple" },
          ]}
          paginationStyleItemInactive={[
            styles.paginationIcon,
            { backgroundColor: "grey" },
          ]}
        >
          <View style={styles.listItem}>
            <AppearanceSetting />
          </View>
          <View style={styles.listItem}>
            <PokeIconSetting pokeID={25} />
          </View>
          <View style={styles.listItem}>
            <Text style={[styles.bodyText, { color: activeColors.textColor }]}>
              On the Pokédex page, tap on the Pokémon that you'd like to view,
              or select different gens to see other options!
            </Text>
            <PokemonItem
              pokeName={"pikachu"}
              id={25}
              width_percent={"50"}
              gen={1}
              disabled={true}
            />
          </View>
        </SwiperFlatList>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: screenWidth * 0.5,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            {screenIndex !== 2 ? (
              <Button title="Skip" onPress={handleFinishSetup} />
            ) : null}
          </View>
          <View
            style={{
              width: screenWidth * 0.5,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            {screenIndex == 2 ? (
              <Button title="Done" onPress={handleFinishSetup} />
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 18,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  header: {
    marginVertical: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
  },
  listItem: {
    width: screenWidth,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationIcon: {
    height: 10,
    width: 10,
    marginHorizontal: 7,
  },
  swiperView: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});
