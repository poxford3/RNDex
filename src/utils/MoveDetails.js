import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import CustomDivider from "./CustomDivider";
import capitalizeString, { capitalizeGens } from "../hooks/capitalizeString";
import images from "../../assets/types";
import type_colors from "../../assets/types/type_colors";
import PullTab from "./PullTab";
import ModalCloseButton from "./ModalCloseButton";

export default function MoveDetails({ route, navigation }) {
  const move = route.params.move;
  const contest_show = move.contest_type
    ? capitalizeString(move.contest_type)
    : "-";
  const mainColor = type_colors[move.type];
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const updatePokemon = useContext(PokemonContext).updatePokemon;

  const DetailItem = ({ header, info, img }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <View>
          <Text style={{ color: mainColor, fontSize: 20, paddingRight: 5 }}>
            {header}{" "}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: activeColors.textColor, fontSize: 20 }}>
              {info}
            </Text>
            <Image style={styles.miniImg} source={images[img]} />
          </View>
        </View>
      </View>
    );
  };

  const OtherPokeList = () => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: mainColor, fontSize: 20, paddingRight: 5 }}>
          Pokémon who can learn
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {move.pokemon.map((poke_name, idx) => {
            const poke_id = poke_name.url.split("/")[6];
            const poke_sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke_id}.png`;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  navigation.goBack();
                  updatePokemon({
                    id: poke_id,
                    pokeName: poke_name.name,
                  });
                  navigation.navigate("Pokemon");
                }}
                style={{
                  marginBottom: 3,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: poke_sprite }}
                  style={styles.pokeSpriteImg}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <PullTab />
      <ModalCloseButton navigation={navigation} />
      <View style={styles.header}>
        <Text style={{ color: mainColor, fontSize: 32 }}>
          {move.move_name}{" "}
        </Text>
        <Image
          source={images[move.type]}
          style={{
            height: 20,
            width: 60,
            resizeMode: "contain",
            marginTop: 5,
          }}
        />
      </View>
      <CustomDivider direction={"horizontal"} />
      <ScrollView>
        <View style={styles.body}>
          <View style={{ width: "95%", padding: 10 }}>
            <DetailItem header={"Description"} info={`${move.desc}`} />
            <DetailItem header={"PP"} info={`${move.pp}`} />
            <DetailItem header={"Power"} info={`${move.power}`} />
            <DetailItem header={"Accuracy"} info={`${move.accuracy}%`} />
            <DetailItem
              header={"Category"}
              info={capitalizeString(move.damageClass)}
              img={move.damageClass}
            />
            <DetailItem
              header={"Generation Introduced"}
              info={capitalizeGens(move.genIntroduced)}
            />
            <DetailItem
              header={"Target"}
              info={capitalizeString(move.target)}
            />
            <DetailItem header={"Contest Type"} info={contest_show} />
            <OtherPokeList />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SPRITE_SIZE = 75;
const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    flexDirection: "row",
  },
  miniImg: {
    marginRight: 5,
    marginLeft: 2,
  },
  pokeSpriteImg: {
    height: SPRITE_SIZE,
    width: SPRITE_SIZE,
  },
});
