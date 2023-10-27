import React, { useEffect, useState, useContext, memo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Modal } from "react-native";
// import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import API_CALL from "../hooks/API_CALL";
import capitalizeString from "../hooks/capitalizeString";
import LoadingView from "../utils/LoadingView";
import MissingInfo from "../utils/MissingInfo";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import box_art from "../../assets/box_art";
import { Button } from "react-native-paper";

export default function Locations() {
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const [locations, setLocations] = useState([]);
  const [games, setGames] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // modal props
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getLocations = async (id) => {
    setLoaded(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;
    // console.log(url);
    const json = await API_CALL(url);
    let tempLocationList = [];

    // console.log(json[0]);
    json.map((e) => {
      // console.log(capitalizeString(e.location_area.name));
      tempLocationList.push({
        location_name: capitalizeString(e.location_area.name).replace(
          "Area",
          ""
        ),
        game: capitalizeString(e.version_details[0]?.version.name),
        chance: e.version_details[0].encounter_details[0].chance,
        min_level: e.version_details[0].encounter_details[0].min_level,
        max_level: e.version_details[0].encounter_details[0].max_level,
      });
    });

    const uniqueGames = [...new Set(tempLocationList.map((item) => item.game))];
    setGames(uniqueGames.sort((a, b) => (a.game > b.game ? 1 : -1)));
    setLocations(tempLocationList.sort((a, b) => (a.game > b.game ? 1 : -1)));
    setLoaded(true);
    // console.log(uniqueGames);
  };

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, []);

  const Location = memo(function Location({ loc }) {
    const box_art_pic = box_art[loc.game.toLowerCase().replace(" ", "")];
    const level_disp =
      loc.min_level == loc.max_level
        ? `Lv ${loc.min_level}`
        : `Lv ${loc.min_level} - ${loc.max_level}`;
    return (
      <View
        style={[styles.locationBox, { borderBottomColor: activeColors.accent }]}
      >
        <View style={styles.locLeft}>
          <Text style={[styles.locText, { color: activeColors.textColor }]}>
            {loc.location_name}
          </Text>
          <Text style={styles.miniLocText}>
            {loc.chance}% - {level_disp}
          </Text>
        </View>
        <View style={styles.locRight}>
          <Image source={box_art_pic} style={{ height: 100, width: 100 }} />
        </View>
      </View>
    );
  });

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: activeColors.textColor }]}>
          Locations
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={showModal}>
            <MaterialCommunityIcons
              name="filter"
              color={activeColors.textColor}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Body = () => {
    if (loaded) {
      if (locations.length > 0) {
        return (
          <FlatList
            data={locations}
            initialNumToRender={15}
            maxToRenderPerBatch={10}
            renderItem={({ item }) => {
              return <Location loc={item} />;
            }}
          />
        );
      } else {
        return (
          <MissingInfo
            str={`${capitalizeString(
              pokemonInfo.pokeName
            )} has no locations where it can be found in the wild`}
            id={pokemonInfo.id}
          />
        );
      }
    } else {
      return <LoadingView />;
    }
  };

  const ModalItem = () => {
    return (
      <View style={styles.modalContainer}>
        <Modal
          animationType={"slide"}
          visible={visible}
          transparent={true}
          // onRequestClose={hideModal}
          style={[
            styles.modalStyle,
            {
              backgroundColor: activeColors.background,
              borderColor: activeColors.textColor,
            },
          ]}
        >
          <View style={styles.modalBox}>
            <Text style={{ color: activeColors.textColor }}>I'm a modal</Text>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Text style={{ color: activeColors.textColor }}>close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, [pokemonInfo]);

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <ModalItem />
      <Header />
      <View style={styles.list}>
        <Body />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBox: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: activeColors.backgroundColor,
    backgroundColor: "green",
  },
  modalStyle: {
    margin: 20,
    // backgroundColor: 'white',
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
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerRight: {
    justifyContent: "center",
    paddingRight: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 32,
    padding: 10,
  },
  list: {
    // height: "100%",
    flex: 1,
  },
  locationBox: {
    height: 150,
    padding: 10,
    // borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  locLeft: {
    width: "50%",
  },
  locRight: {
    width: "50%",
    paddingLeft: 10,
    // alignItems: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  locText: {
    fontSize: 26,
    fontWeight: "500",
  },
  miniLocText: {
    fontSize: 18,
    color: "grey",
  },
  pokemonImg: {
    height: 90,
    width: 90,
    marginHorizontal: 10,
  },
});
