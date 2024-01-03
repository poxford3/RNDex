import React, { useContext, useEffect, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";

export default function LoadingView() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const rotate = useMemo(() => new Animated.Value(0), []);

  // functionality borrowed from
  // https://github.com/MatheusPires99/pokedex
  const rotatePokeball = useCallback(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 360,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotate]);

  useEffect(() => {
    rotatePokeball();
  }, [rotatePokeball]);

  return (
    <View
      style={[styles.loading, { backgroundColor: activeColors.background }]}
    >
      {/* <ActivityIndicator
        size="large"
        animating={true}
        style={{ padding: 10 }}
        color={activeColors.accent}
      />
      <Text style={{ color: activeColors.textColor }}>Loading...</Text> */}
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotate.interpolate({
                inputRange: [0, 360],
                outputRange: ["0deg", "360deg"],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Image
          source={require("../../assets/poke_ball_flat.png")}
          style={{ height: 50, width: 50 }}
        />
      </Animated.View>
      <Text style={{ color: activeColors.textColor }}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
