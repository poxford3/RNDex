import React, { useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import natures from "../../assets/natures";
import capitalizeString from "../hooks/capitalizeString";

export default function Natures() {
    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: activeColors.background}]}>
      <FlatList 
        data={natures}
        renderItem={({item}) => {
          return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: activeColors.textColor, width: '33%'}}>{capitalizeString(item.nature)}</Text>
              <Text style={{color: activeColors.textColor, width: '33%'}}>{capitalizeString(item.increased_stat)}</Text>
              <Text style={{color: activeColors.textColor, width: '33%'}}>{capitalizeString(item.decreased_stat)}</Text>
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
