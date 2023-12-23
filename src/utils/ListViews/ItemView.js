import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, Image } from "react-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import API_CALL from "../../hooks/API_CALL";
import capitalizeString from "../../hooks/capitalizeString";
import LoadingView from "../LoadingView";

export default function ItemView({ route }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const [itemDetails, setItemDetails] = useState(null);
  const [itemAttrs, setItemAttrs] = useState([]);
  const [itemEffect, setItemEffect] = useState();

  const getItemDetails = async () => {
    const response = await API_CALL(route.params.route.url);

    let arr_effect;
    if (response.effect_entries.length > 0) {
      arr_effect = response.effect_entries
        .filter((elem) => elem.language.name == "en")[0]
        .short_effect.replaceAll("\n", ""); // gets most recent english description
    } else if (response.effect_entries.length > 0) {
      arr_effect = response.flavor_text_entries
        .filter((elem) => elem.language.name == "en")[0]
        .text.replaceAll("\n", " ");
    } else {
      arr_effect =
        "No text is available for this item. Check back at a later date.";
    }

    // console.log(arr[0].effect);
    // console.log(response.sprites.default);
    // console.log(`\n--\n--\n`, response, `\n--\n--\n`);

    setItemEffect(arr_effect);
    setItemAttrs(response.attributes.map((a) => a.name));
    setItemDetails(response);
  };

  const MissingImage = () => {
    return (
      <View
        style={{
          height: 80,
          width: 80,
          borderColor: activeColors.textColor,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: activeColors.textColor, fontSize: 44 }}>?</Text>
      </View>
    );
  };

  const DetailItem = ({ header, info }) => {
    const mainColor = activeColors.textColor;
    return (
      <View style={{ marginVertical: 10 }}>
        <View>
          <Text style={[styles.headerText, { color: mainColor }]}>
            {header}{" "}
          </Text>
          {info.map((i, idx) => {
            return (
              <Text
                key={idx}
                style={{ color: activeColors.textColor, fontSize: 20 }}
              >
                {capitalizeString(i)}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  const Body = () => {
    return (
      <View style={styles.body}>
        {itemDetails.sprites.default ? (
          <Image
            source={{ uri: itemDetails.sprites.default }}
            style={{ height: 80, width: 80 }}
          />
        ) : (
          <MissingImage />
        )}
        <Text
          style={{
            color: activeColors.textColor,
            fontSize: 14,
          }}
        >
          Cost:{" "}
          {itemDetails.cost == 0
            ? "This item cannot be purchased"
            : itemDetails.cost.toLocaleString()}
        </Text>
        <View style={{ alignItems: "flex-start", width: "100%" }}>
          <DetailItem header={"Category"} info={[itemDetails.category.name]} />
          <DetailItem header={"Description"} info={[itemEffect]} />
          {itemDetails.attributes.length > 0 ? (
            <DetailItem header={"Attributes"} info={itemAttrs} />
          ) : null}
        </View>
      </View>
    );
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      {itemDetails ? <Body /> : <LoadingView />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    padding: 10,
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    paddingRight: 5,
    fontWeight: "bold",
  },
});
