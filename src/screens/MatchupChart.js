import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import type_colors from "../../assets/types/type_colors";
import { types, type_name } from "../hooks/TypeEffectiveness";

const screenWidth = Dimensions.get("window").width;

export default function MatchupChart() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  // remove the "None" type
  const typeArr = ["", ...type_name.slice(0, -1)];

  // remove the "None" type chart
  const types_filter = types.slice(0, -1);

  // arrays to even the
  let list_of_1s = [];
  let list_of_28s = [];
  for (let i = 0; i <= 9; i++) {
    list_of_1s.push(1);
    list_of_28s.push(28);
  }

  const CellElement = ({ text }) => {
    const numColor =
      text == 1
        ? "grey"
        : text == 0
        ? "red"
        : text == 0.5
        ? "orange"
        : text == 2
        ? "green"
        : activeColors.background;
    return (
      <View
        style={[
          styles.cell,
          {
            // borderBottomColor: activeColors.textColor,
            // borderBottomWidth: 1,
            // borderTopColor: activeColors.textColor,
            // borderTopWidth: 1,
            backgroundColor: numColor,
          },
        ]}
      >
        <Text style={{ color: activeColors.textColor }}>{text}</Text>
      </View>
    );
  };

  const RowElement = ({ arr }) => {
    // console.log("arr", arr);
    return (
      <View
        style={{ flexDirection: "row" }}
        // horizontal
      >
        {arr.map((elem, idx) => {
          // console.log(elem);
          return <CellElement key={idx} text={elem} />;
        })}
      </View>
    );
  };

  const TableElement = () => {
    {
      types_filter.map((typeList, idx) => {
        return <RowElement arr={typeList} key={idx} />;
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <View style={styles.first}>
        <View style={{ height: 50 }}>
          <ScrollView horizontal>
            {typeArr.map((name) => {
              return (
                <View
                  key={name}
                  style={[
                    styles.cell,
                    {
                      borderBottomColor: activeColors.textColor,
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <Text style={{ color: type_colors[name.toLowerCase()] }}>
                    {name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ScrollView width={100}>
            {type_name.map((name, idx) => {
              return (
                <View
                  key={idx}
                  style={[
                    styles.cell,
                    {
                      borderRightColor: activeColors.textColor,
                      borderRightWidth: 1,
                    },
                  ]}
                >
                  <Text
                    key={idx}
                    style={{ color: type_colors[name.toLowerCase()] }}
                  >
                    {name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
          <ScrollView>
            {types_filter.map((typeList, idx) => {
              return <RowElement arr={typeList} key={idx} />;
            })}
          </ScrollView>
        </View>
      </View>
      {/* <View style={styles.third}>
        <ScrollView horizontal>
          <Table>
            <Col
              data={typeArr}
              style={styles.col}
              textStyle={styles.text}
              heightArr={list_of_28s}
            />
          </Table>
          <Table>
            {types_filter.map((typeNum, idx) => {
              return (
                <Row
                  key={idx}
                  data={typeNum}
                  height={28}
                  widthArr={list_of_28s}
                  style={[
                    styles.row,
                    idx % 2 && { backgroundColor: "#F7F6E7" },
                  ]}
                  textStyle={styles.text}
                />
              );
            })}
          </Table>
        </ScrollView>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    height: 40,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    height: 28,
  },
  wrapper: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  third: {
    flex: 1,
    flexDirection: "row",
  },
  header: {
    height: 50,
    backgroundColor: "#537791",
  },
});
