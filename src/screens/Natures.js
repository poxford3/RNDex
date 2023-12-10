import React, { useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import {natures, natureColors} from "../../assets/natures";
// import natureColors from "../../assets/natures";
import capitalizeString from "../hooks/capitalizeString";
import CustomDivider from "../utils/CustomDivider";

export default function Natures() {
    const { theme } = useContext(ThemeContext);
    let activeColors = themeColors[theme.mode];

    const tableHead = ["Nature", "Increased Stat (+10%)", "Decreased Stat (-10%)"]

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: activeColors.background}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={[styles.textFormat, {borderColor: activeColors.background,}]}>
              <Text style={{color: activeColors.textColor}}>Nature</Text>
            </View>
            <View style={[styles.textFormat, {borderLeftWidth: 1, borderLeftColor: activeColors.textColor, borderRightWidth: 1, borderRightColor: activeColors.textColor}]}>
              <Text style={{color: activeColors.textColor}}>Increased Stat (+10%)</Text>
            </View>
            <View style={styles.textFormat}>
              <Text style={{color: activeColors.textColor}}>Decreased Stat (-10%)</Text>
            </View>
            </View>
            <CustomDivider direction={"horizontal"} />
      <FlatList 
        data={natures}
        renderItem={({item}) => {
          // 
          const incr_stat = item.increased_stat == "-" ? "-" : capitalizeString(item.increased_stat);
          const incr_stat_color = item.increased_stat == "-" ? activeColors.background : natureColors[item.increased_stat];
          const decr_stat = item.decreased_stat == "-" ? "-" : capitalizeString(item.decreased_stat);
          const decr_stat_color = item.decreased_stat == "-" ? activeColors.background : natureColors[item.decreased_stat];
          return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={[styles.textFormat, {borderColor: activeColors.textColor}]}>
                <Text style={{color: activeColors.textColor}}>{capitalizeString(item.nature)}</Text>
              </View>
              <View style={[styles.textFormat, {alignItems: 'flex-start', backgroundColor: incr_stat_color, borderColor: activeColors.textColor}]}>
                <Text style={{color: 'black'}}>{incr_stat}</Text>
              </View>
              <View style={[styles.textFormat, {alignItems: 'flex-start', backgroundColor: decr_stat_color, borderColor: activeColors.textColor}]}>
                <Text style={{color: 'black'}}>{decr_stat}</Text>
              </View>
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
  textFormat: {
    width: '33%',
    justifyContent: 'center',
    alignItems: "center",
    // borderColor: 'white',
    borderWidth: 1,
    padding: 5,
  },
});