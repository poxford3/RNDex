import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import CustomDivider from "./CustomDivider";

export default function LocationModal(props) {
  const [selectAll, setSelectAll] = useState(false);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const UniqueGameItem = ({ gameObj }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() => {
          let newGameSelected = [...props.games];
          for (let gameItem of newGameSelected) {
            if (gameItem.game == gameObj.game) {
              gameItem.selected = gameItem.selected == true ? false : true;
              break;
            }
          }
          props.setGames(newGameSelected);
        }}
      >
        <Text style={{ color: activeColors.textColor }}>{gameObj.game}</Text>
        <MaterialCommunityIcons
          name={gameObj.selected == true ? "circle" : "circle-outline"}
          size={20}
          color={activeColors.textColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType={"slide"}
      visible={props.visible}
      transparent={true}
      onRequestClose={() => props.hideModal()}
      style={styles.modalStyle}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => props.hideModal()}
      >
        <View
          scrollEnabled={props.games.length > 5}
          style={[
            styles.modalBox,
            {
              backgroundColor: activeColors.modal,
              borderColor: activeColors.textColor,
            },
          ]}
        >
          <View style={{ width: 200, padding: 5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: activeColors.textColor,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Game Filter
              </Text>
              <MaterialCommunityIcons
                name={selectAll ? "circle" : "circle-outline"}
                size={24}
                color={activeColors.textColor}
                onPress={() => {
                  setSelectAll(!selectAll);
                  let newGameSelected = [...props.games];
                  for (let gameItem of newGameSelected) {
                    gameItem.selected = !selectAll;
                  }
                  props.setGames(newGameSelected);
                }}
              />
            </View>
            <CustomDivider direction={"horizontal"} />
            <View style={{ maxHeight: 250 }}>
              <FlatList
                data={props.games}
                scrollEnabled={props.games.length > 5}
                renderItem={({ item }) => {
                  return <UniqueGameItem gameObj={item} />;
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.hideModal();
              props.setGameFilter(props.games.filter((e) => e.selected));
            }}
          >
            <Text
              style={{
                color: activeColors.textColor,
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBox: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalStyle: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
