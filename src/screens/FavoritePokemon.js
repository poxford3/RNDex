import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
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
import LoadingView from "../utils/LoadingView";

export default function FavoritePokemon() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [favPokeList, setFavPokeList] = useState([]);
  const [favPokeCount, setFavPokeCount] = useState(0);
  const [sortOption, setSortOption] = useState();
  const [sortNum, setSortNum] = useState(1);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const Body = () => {
    if (loaded) {
      if (favPokeList.length != 0) {
        return (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {sortOption.map((pokemon, idx) => {
              return (
                <PokemonItem
                  pokeName={pokemon.pokeName}
                  id={pokemon.id}
                  width_percent={50}
                  key={idx}
                />
              );
            })}
          </View>
        );
      } else {
        return <MissingFavorites />;
      }
    } else {
      return <LoadingView />;
    }
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
      title: "ID (highest first) ",
      id: 3,
    },
    {
      leadingIcon: "sort-numeric-descending",
      title: "ID (lowest first) ",
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

  useEffect(() => {
    fetchStoredPokemon();
  }, []);

  useEffect(() => {
    setSortOption(handleSortOptions(favPokeList, 1));
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
              {menuItems.map((item, idx) => {
                return (
                  <View key={idx}>
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
          <View style={styles.headerRight}>
            <Text style={{ color: activeColors.textColor }}>
              Total Num: {favPokeCount}
            </Text>
          </View>
        </View>
        <CustomDivider direction={"horizontal"} />
        <Body />
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
