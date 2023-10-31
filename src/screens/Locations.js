import React, { useEffect, useState, useContext, memo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import API_CALL from "../hooks/API_CALL";
import capitalizeString from "../hooks/capitalizeString";
import LoadingView from "../utils/LoadingView";
import CustomDivider from "../utils/CustomDivider";
import MissingInfo from "../utils/MissingInfo";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import box_art from "../../assets/box_art";

export default function Locations() {
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const [locations, setLocations] = useState([]);
  const [games, setGames] = useState([]);
  const [gameFilter, setGameFilter] = useState([]);
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

    const uniqueGames = [
      ...new Set(tempLocationList.map((item) => item.game)),
    ].sort();
    setGames(uniqueGames);
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
          <Image
            source={box_art_pic}
            style={{ height: 100, width: 100, resizeMode: "contain" }}
          />
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
      <Modal
        animationType={"slide"}
        visible={visible}
        transparent={true}
        onRequestClose={hideModal}
        style={styles.modalStyle}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalBox,
              {
                backgroundColor: activeColors.modal,
                borderColor: activeColors.textColor,
              },
            ]}
          >
            <View style={{ flexShrink: 1, width: 135 }}>
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
                  Filter
                </Text>
                <MaterialCommunityIcons
                  name="close"
                  size={26}
                  color={activeColors.textColor}
                />
              </View>
              <CustomDivider direction={"horizontal"} />
              <FlatList
                data={games}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  return <UniqueGameItem game={item} />;
                }}
              />
            </View>
            <TouchableOpacity onPress={hideModal}>
              <Text style={{ color: activeColors.textColor }}>{"\n"}Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const UniqueGameItem = ({ game }) => {
    let tempGameList = gameFilter;
    return (
      <View
        style={{
          height: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: activeColors.textColor }}>{game}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("in button", game);
            if (tempGameList.includes(game)) {
              tempGameList.splice(tempGameList.indexOf(game), 1);
              setGameFilter(tempGameList);
            } else {
              tempGameList.push(game);
              setGameFilter(tempGameList);
            }
          }}
        >
          <MaterialCommunityIcons
            name={gameFilter.includes(game) ? "circle" : "circle-outline"}
            size={20}
            color={activeColors.textColor}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, [pokemonInfo]);

  // useEffect(() => {
  //   console.log(gameFilter);
  // }, [gameFilter]);

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Header />
      {1 == 2 && <ModalItem />}
      <View style={styles.list}>
        <Body />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: 20,
    borderRadius: 20,
    padding: 20,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    minHeight: 150,
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
