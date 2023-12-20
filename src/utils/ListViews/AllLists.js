import React, { useContext, useEffect, useState, memo } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from "react-native-paper";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import capitalizeString from "../../hooks/capitalizeString";
import API_CALL from "../../hooks/API_CALL";
import LoadingView from "../LoadingView";

export default function AllLists({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // console.log("context title", route.params.list_data);
  const list_data = route.params.list_data;

  const [apiResponse, setAPIResponse] = useState();

  const getListData = async () => {
    const call_limit = 10000;
    const url = `https://pokeapi.co/api/v2/${list_data.api_context}?limit=${call_limit}`;
    const response = await API_CALL(url);

    setAPIResponse(response.results);
  };

  const RenderItems = memo(function RenderItems({ item }) {
    let sprite_url, imgSize;
    if (list_data.api_context == "item") {
      sprite_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`;
      imgSize = 50;
    }
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(list_data.detailPage, {
            route: item,
          });
        }}
        style={{
          padding: 10,
          height: 70,
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
          {imgSize > 0 ? (
            <Image
              source={{ uri: sprite_url }}
              style={{ height: imgSize, width: imgSize }}
            />
          ) : null}
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
    ? apiResponse.filter((x) =>
        x.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : apiResponse;

  useEffect(() => {
    getListData();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {apiResponse ? (
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
            placeholder={`Find your favorite ${list_data.api_context}!`}
            placeholderTextColor={activeColors.searchBarPlaceholder}
          />
          <FlatList
            data={searchFilteredData}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => {
              return <RenderItems item={item} />;
            }}
          />
        </View>
      ) : (
        <LoadingView />
      )}
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
