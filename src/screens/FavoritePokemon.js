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
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { getData } from "../config/asyncStorage";
import { PokemonItem } from "../utils/PokemonComponents/PokemonItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDivider from "../utils/CustomDivider";

export default function FavoritePokemon() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [favPokeList, setFavPokeList] = useState([]);
  const [favPokeCount, setFavPokeCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const renderPokeItem = ({ item }) => {
    const date_show = new Date(item.date_added).toLocaleString();
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PokemonItem
            pokeName={item.pokeName}
            id={item.id}
            width_percent={100}
          />
        </View>
        <View style={{ width: "50%", justifyContent: "center" }}>
          <Text style={{ color: activeColors.textColor }}>ID: {item.id}</Text>
          <Text style={{ color: activeColors.textColor }}>Date added:</Text>
          <Text style={{ color: activeColors.textColor }}>{date_show}</Text>
        </View>
      </View>
    );
  };

  // menu control

  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 });

  const onIconPress = (event) => {
    const { nativeEvent } = event;
    const anchor = {
      x: nativeEvent.locationX,
      y: nativeEvent.locationY,
    };
    // console.log("anchor", anchor);
    // console.log("event", nativeEvent);
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

  // check list again when they return from looking at a pokemon
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchStoredPokemon();
    }
  }, [isFocused]);

  // newest to oldest
  const dataToShow = favPokeList.sort((a, b) =>
    b.date_added > a.date_added ? 1 : -1
  );

  // oldest to newest
  // const dataToShow = favPokeList.sort((a, b) =>
  //   b.date_added < a.date_added ? 1 : -1
  // );

  // sort by id
  // const dataToShow = favPokeList.sort((a, b) => a.id - b.id);

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
              <Menu.Item
                leadingIcon={"sort-calendar-ascending"}
                // onPress={() => {}}
                onPress={closeMenu}
                title="Date added (most recent)"
                style={{
                  backgroundColor: activeColors.background,
                }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-calendar-descending"}
                // onPress={() => {}}
                onPress={closeMenu}
                title="Date added (least recent)"
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-numeric-ascending"}
                // onPress={() => {}}
                onPress={closeMenu}
                title="ID (lo to hi)"
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-numeric-descending"}
                // onPress={() => {}}
                onPress={closeMenu}
                title="ID (hi to lo)"
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-alphabetical-ascending"}
                // onPress={() => {}}
                onPress={closeMenu}
                title="abc (a to z)"
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-alphabetical-descending"}
                // onPress={() => {}}
                onPress={closeMenu}
                title="abc (z to a)"
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
            </Menu>
          </View>
          <View style={styles.headerRight}>
            <Text style={{ color: activeColors.textColor }}>
              Total Num: {favPokeCount}
            </Text>
          </View>
        </View>
        <CustomDivider direction={"horizontal"} />
        <FlatList data={dataToShow} renderItem={renderPokeItem} />
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
