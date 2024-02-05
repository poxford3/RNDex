import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Menu, Divider, PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { getData } from "../config/asyncStorage";
import { PokemonItem } from "../utils/PokemonComponents/PokemonItem";
import CustomDivider from "../utils/CustomDivider";
import MissingFavorites from "../utils/MissingFavorites";

import { PokemonContext } from "../contexts/PokemonContext";

export default function FavoritePokemon() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo, updatePokemon } = useContext(PokemonContext);

  const [favPokeList, setFavPokeList] = useState([]);
  const [favPokeCount, setFavPokeCount] = useState(0);
  const [sortOption, setSortOption] = useState(1);
  const [sortNum, setSortNum] = useState();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const Body = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {sortOption.map((pokemon) => {
          return (
            <PokemonItem
              pokeName={pokemon.pokeName}
              id={pokemon.id}
              width_percent={50}
              key={pokemon.id}
            />
          );
        })}
      </View>
    );
  };

  const handleSortOptions = (arr, num) => {
    let output;
    switch (true) {
      case num == 1: // date asc
        output = arr.sort((a, b) => (b.date_added > a.date_added ? 1 : -1));
        setSortNum(1);
        break;
      case num == 2: // date desc
        output = arr.sort((a, b) => (b.date_added < a.date_added ? 1 : -1));
        setSortNum(2);
        break;
      case num == 3: // id asc
        output = arr.sort((a, b) => (b.id < a.id ? 1 : -1));
        setSortNum(3);
        break;
      case num == 4: // id desc
        output = arr.sort((a, b) => (b.id > a.id ? 1 : -1));
        setSortNum(4);
        break;
      case num == 5: // alpha asc
        output = arr.sort((a, b) => (b.pokeName < a.pokeName ? 1 : -1));
        setSortNum(5);
        break;
      case num == 6: // alpha desc
        output = arr.sort((a, b) => (b.pokeName > a.pokeName ? 1 : -1));
        setSortNum(6);
        break;
    }
    return output;
  };

  // menu control

  const menuItems = [
    {
      leadingIcon: "sort-calendar-ascending",
      title: "Date added (most recent) ",
      id: 1,
    },
    {
      leadingIcon: "sort-calendar-descending",
      title: "Date added (least recent) ",
      id: 2,
    },
    {
      leadingIcon: "sort-numeric-ascending",
      title: "ID (lowest first) ",
      id: 3,
    },
    {
      leadingIcon: "sort-numeric-descending",
      title: "ID (highest first) ",
      id: 4,
    },
    {
      leadingIcon: "sort-alphabetical-ascending",
      title: "ABC (A...Z) ",
      id: 5,
    },
    {
      leadingIcon: "sort-alphabetical-descending",
      title: "ABC (Z...A) ",
      id: 6,
    },
  ];

  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const onIconPress = (event) => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.locationX,
      y: nativeEvent.locationY,
    };
    setMenuAnchor(anchor);
    openMenu();
  };

  const fetchStoredPokemon = async () => {
    try {
      const favPokes = await getData("favPokeList");

      if (favPokes) {
        setFavPokeList(favPokes);
        setFavPokeCount(favPokes.length);
      }
    } catch ({ message }) {
      console.log("fetch fav poke error", message);
    }
  };

  // get stored pokemon from asyncStorage
  useEffect(() => {
    fetchStoredPokemon();
  }, []);

  // set initial sortOptions based on either current selection
  // or initial sort id
  useEffect(() => {
    setSortOption(handleSortOptions(favPokeList, sortNum ? sortNum : 1));
  }, [favPokeList]);

  // check list again when they return from looking at a pokemon
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchStoredPokemon();
    }
  }, [isFocused]);

  return (
    <PaperProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: activeColors.background }]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={{ color: activeColors.textColor }}>
              Total Num: {favPokeCount}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.order} onPress={onIconPress}>
              <MaterialCommunityIcons
                name="sort-variant"
                size={30}
                color={activeColors.grey}
              />
              <Text style={{ color: activeColors.grey, fontSize: 22 }}>
                Sort
              </Text>
            </TouchableOpacity>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={menuAnchor}
              style={{
                backgroundColor: activeColors.background,
                borderColor: activeColors.oppositeBkg,
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              {menuItems.map((item) => {
                return (
                  <View key={item.id}>
                    <Menu.Item
                      leadingIcon={item.leadingIcon}
                      trailingIcon={sortNum == item.id ? "check" : null}
                      onPress={() => {
                        setSortOption(handleSortOptions(favPokeList, item.id));
                        closeMenu();
                      }}
                      title={item.title}
                      style={{
                        backgroundColor: activeColors.background,
                      }}
                      titleStyle={{ color: activeColors.textColor }}
                    />
                    <Divider />
                  </View>
                );
              })}
            </Menu>
          </View>
        </View>
        <CustomDivider direction={"horizontal"} />
        {favPokeList.length != 0 ? (
          <ScrollView
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Body />
          </ScrollView>
        ) : (
          <MissingFavorites />
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  headerLeft: {
    width: "50%",
    justifyContent: "center",
  },
  headerRight: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  order: {
    flexDirection: "row",
    alignItems: "center",
  },
});
