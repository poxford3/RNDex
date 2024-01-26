import React, { useEffect, useState, useContext, memo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import LocationModal from "../utils/LocationModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import API_CALL from "../hooks/API_CALL";
import capitalizeString from "../hooks/capitalizeString";
import LoadingView from "../utils/LoadingView";
import MissingInfo from "../utils/MissingInfo";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import box_art from "../../assets/box_art";
import BannerAdComp from "../utils/BannderAdComp";

export default function Locations() {
  const pokemonInfo = useContext(PokemonContext).pokemon;
  const [locations, setLocations] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // modal props
  const [games, setGames] = useState([]);
  const [gameFilter, setGameFilter] = useState([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const getLocations = async (id) => {
    setLoaded(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;
    const json = await API_CALL(url);
    let tempLocationList = [];

    json.map((e) => {
      e.version_details.map((o) => {
        tempLocationList.push({
          location_name: capitalizeString(e.location_area.name).replace(
            "Area",
            ""
          ),
          game: capitalizeString(o.version.name),
          chance: o.encounter_details[0].chance,
          min_level: o.encounter_details[0].min_level,
          max_level: o.encounter_details[0].max_level,
        });
      });
    });

    const uniqueGames = [
      ...new Set(tempLocationList.map((item) => item.game)),
    ].sort();
    let uniqueGamesObj = uniqueGames.map((game) => ({
      game: game,
      selected: false,
    }));
    setGames(uniqueGamesObj);
    setLocations(tempLocationList.sort((a, b) => (a.game > b.game ? 1 : -1)));
    setLoaded(true);
  };

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
    let locFilter = locations.filter((loc) => {
      return gameFilter.some((f) => {
        return f.game == loc.game;
      });
    });
    let locationShown = locFilter.length > 0 ? locFilter : locations;
    // console.log("loc length", locationShown.length);
    if (loaded) {
      if (locations.length > 0) {
        return (
          <FlatList
            data={locationShown}
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

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, []);

  useEffect(() => {
    getLocations(pokemonInfo.id);
  }, [pokemonInfo]);

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <Header />
      <LocationModal
        showModal={showModal}
        hideModal={hideModal}
        visible={visible}
        games={games}
        setGames={setGames}
        setGameFilter={setGameFilter}
      />
      <View style={styles.list}>
        <Body />
      </View>
      <BannerAdComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    flex: 1,
    width: "100%",
  },
  locationBox: {
    minHeight: 150,
    padding: 10,
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  locLeft: {
    width: "50%",
  },
  locRight: {
    width: "50%",
    padding: 10,
    alignItems: "flex-end",
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
