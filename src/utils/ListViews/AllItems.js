import React, { memo, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from "react-native-paper";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import API_CALL from "../../hooks/API_CALL";
import capitalizeString from "../../hooks/capitalizeString";

export default function AllItems({ navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [itemInfo, setItemInfo] = useState([]);

  const getItems = async () => {
    const call_limit = 10000;
    const item_url = `https://pokeapi.co/api/v2/item?limit=${call_limit}`;
    const response = await API_CALL(item_url);

    // setItemInfo(
    //   response.results.sort((a, b) =>
    //     a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    //   )
    // );
    setItemInfo(response.results);
  };

  const RenderItems = memo(function RenderItems({ item }) {
    const sprite_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`;
    const imgSize = 50;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ItemView", {
            route: item,
          });
        }}
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomColor: activeColors.textColor,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: activeColors.textColor, fontSize: 26 }}>
            {capitalizeString(item.name)}
          </Text>
          <Image
            source={{ uri: sprite_url }}
            style={{ height: imgSize, width: imgSize }}
          />
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={activeColors.textColor}
        />
      </TouchableOpacity>
    );
  });

  // search bar tracking
  const [searchText, setSearchText] = useState();
  searchFilteredData = searchText
    ? itemInfo.filter((x) =>
        x.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : itemInfo;

  useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.body}>
        <Searchbar
          style={{
            marginVertical: 5,
            width: "95%",
            backgroundColor: activeColors.accent,
            borderColor: activeColors.border,
          }}
          keyboardAppearance={activeColors.themeTypeLower}
          iconColor={activeColors.textColor}
          inputStyle={{ color: activeColors.textColor }}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          placeholder={`Find your favorite item!`}
          placeholderTextColor={activeColors.searchBarPlaceholder}
        />
      </View>
      <FlatList
        data={searchFilteredData}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          return <RenderItems item={item} />;
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
