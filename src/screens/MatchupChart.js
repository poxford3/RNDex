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
    return (
      <View
        style={[
          styles.cell,
          {
            // borderBottomColor: activeColors.textColor,
            // borderBottomWidth: 1,
            // borderTopColor: activeColors.textColor,
            // borderTopWidth: 1,
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
            {typeArr.map((name, idx) => {
              return (
                <View
                  key={idx}
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
      {/* <View style={styles.second}>
        <ScrollView horizontal>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={typeArr}
              style={styles.row}
              flexArr={list_of_1s}
              textStyle={{ color: activeColors.textColor, textAlign: "center" }}
            />
            <TableWrapper style={styles.wrapper}>
              <ScrollView stickyHeaderIndices={[1]}>
                <Col
                  data={type_name}
                  style={styles.cell}
                  textStyle={{
                    color: activeColors.textColor,
                    textAlign: "center",
                  }}
                  heightArr={list_of_28s}
                  flexArr={list_of_1s}
                />
                <Rows
                  data={types_filter}
                  style={styles.row}
                  flexArr={list_of_1s}
                  textStyle={{
                    color: activeColors.textColor,
                    textAlign: "center",
                  }}
                />
              </ScrollView>
            </TableWrapper>
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
});
