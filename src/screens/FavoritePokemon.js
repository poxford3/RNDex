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
import capitalizeString from "../hooks/capitalizeString";

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

  const renderPokeItem = ({ item }) => {
    return (
      <PokemonItem pokeName={item.pokeName} id={item.id} width_percent={50} />
    );
  };

  const Body = () => {
    if (loaded) {
      if (favPokeList.length != 0) {
        return (
          <FlatList
            data={sortOption}
            numColumns={2}
            maxToRenderPerBatch={10}
            keyExtractor={(item) => item.id}
            initialNumToRender={30}
            renderItem={renderPokeItem}
          />
        );
      } else {
        return <MissingFavorites />;
      }
      // if ()
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
    // console.log(output);
    return output;
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
              <Menu.Item
                leadingIcon={"sort-calendar-ascending"}
                trailingIcon={sortNum == 1 ? "check" : null}
                onPress={() => {
                  setSortOption(handleSortOptions(favPokeList, 1));
                  closeMenu();
                }}
                // onPress={closeMenu}
                title="Date added (most recent) "
                style={{
                  backgroundColor: activeColors.background,
                }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-calendar-descending"}
                trailingIcon={sortNum == 2 ? "check" : null}
                onPress={() => {
                  setSortOption(handleSortOptions(favPokeList, 2));
                  closeMenu();
                }}
                title="Date added (least recent) "
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-numeric-ascending"}
                trailingIcon={sortNum == 3 ? "check" : null}
                onPress={() => {
                  setSortOption(handleSortOptions(favPokeList, 3));
                  closeMenu();
                }}
                title="ID (lowest first) "
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-numeric-descending"}
                trailingIcon={sortNum == 4 ? "check" : null}
                onPress={() => {
                  setSortOption(handleSortOptions(favPokeList, 4));
                  closeMenu();
                }}
                title="ID (highest first) "
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-alphabetical-ascending"}
                trailingIcon={sortNum == 5 ? "check" : null}
                onPress={() => {
                  setSortOption(handleSortOptions(favPokeList, 5));
                  closeMenu();
                }}
                title="ABC (A...Z) "
                style={{ backgroundColor: activeColors.background }}
                titleStyle={{ color: activeColors.textColor }}
              />
              <Divider />
              <Menu.Item
                leadingIcon={"sort-alphabetical-descending"}
                trailingIcon={sortNum == 6 ? "check" : null}
                onPress={() => {
                  setSortOption(handleSortOptions(favPokeList, 6));
                  closeMenu();
                }}
                title="ABC (Z...A) "
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
