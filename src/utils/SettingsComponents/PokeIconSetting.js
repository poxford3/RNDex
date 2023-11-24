import { useContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import themeColors from "../../styles/themeColors";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SpriteContext } from "../../contexts/SpriteContext";

export default function PokeIconSetting({ pokeID }) {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { sprites, updateSprites } = useContext(SpriteContext);

  const pokemonImgID = pokeID;
  const classic_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${pokemonImgID}.png`;
  const modern_url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonImgID}.png`;
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={[styles.headerText, { color: activeColors.textColor }]}>
        Sprite Type
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={[styles.toggleBox, { borderColor: activeColors.border }]}
          onPress={() => {
            updateSprites("modern");
          }}
        >
          <Image
            style={[
              styles.selectionImg,
              {
                borderColor:
                  sprites.type == "modern" ? "blue" : activeColors.border,
              },
            ]}
            source={{ uri: modern_url }}
          />
          <Text
            style={{
              color: activeColors.textColor,
              marginVertical: 5,
            }}
          >
            Modern
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleBox}
          onPress={() => {
            updateSprites("classic");
          }}
        >
          <Image
            style={[
              styles.selectionImg,
              {
                borderColor:
                  sprites.type == "classic" ? "blue" : activeColors.border,
                padding: 5,
              },
            ]}
            source={{ uri: classic_url }}
          />
          <Text
            style={{
              color: activeColors.textColor,
              marginVertical: 5,
            }}
          >
            Classic
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    marginBottom: 10,
  },
  toggleBox: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectionImg: {
    height: 87,
    width: 110,
    borderWidth: 3,
    borderRadius: 20,
  },
});
