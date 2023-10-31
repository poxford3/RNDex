import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderImage from "../utils/HeaderImage";
import { StatusBar, Text } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";

import Pokedex from "./Pokedex";
import TestView from "./TestView";
import APITest from "./APITest";
import Info from "./Info";
import GenerationList from "./GenerationList";
import Settings from "./Settings";
import FavoritePokemon from "./FavoritePokemon";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const pokemonInfo = useContext(PokemonContext).pokemon;

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Pokedex"
        initialRouteName="Test"
        screenOptions={{
          headerTintColor: activeColors.textColor,
          headerStyle: { backgroundColor: activeColors.background },
        }}
      >
        <Stack.Screen
          name="Pokedex"
          component={Pokedex}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PokemonTabNav"
          component={PokemonBottomTabNav}
          options={({ route }) => ({
            // title: route.params.pokeName,
            headerTitle: (props) => <HeaderImage id={pokemonInfo.id} />,
          })}
        />
        <Stack.Screen name="Test" component={TestView} />
        <Stack.Screen name="APITest" component={APITest} />
        <Stack.Screen name="Information" component={Info} />
        <Stack.Screen name="Gens" component={GenerationList} />
        <Stack.Screen name="Favorites" component={FavoritePokemon} />
        <Stack.Group
          screenOptions={{ presentation: "modal", headerShown: false }}
        >
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar barStyle={activeColors.barStyle} backgroundColor="#000000" />
    </NavigationContainer>
  );
}

import Pokemon from "./Pokemon";
import Evolutions from "./Evolutions";
import Locations from "./Locations";
import Moves from "./Moves";

const Tab = createMaterialBottomTabNavigator();
// https://reactnavigation.org/docs/nesting-navigators/#passing-params-to-a-screen-in-a-nested-navigator
// will need the above shortly

export function PokemonBottomTabNav() {
  // let info = route.params;
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo } = useContext(PokemonContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "green",
      }}
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarLabel: (
          <Text
            style={{
              color: navigation.isFocused() ? activeColors.textColor : "grey",
            }}
          >
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ color, size, focused }) => {
          // console.log(color);
          const icons = {
            Pokemon: "information",
            Evolutions: "duck",
            Locations: "map",
            Moves: "abacus",
          };
          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              color={color}
              size={26}
            />
          );
        },
      })}
      barStyle={{
        backgroundColor: activeColors.background,
        borderTopColor: activeColors.grey,
        borderTopWidth: 0.4,
      }}
      initialRouteName="Pokemon"
    >
      <Tab.Screen
        name="Pokemon"
        component={Pokemon}
        initialParams={pokemonInfo}
      />
      <Tab.Screen
        name="Evolutions"
        component={Evolutions}
        initialParams={pokemonInfo}
      />
      <Tab.Screen
        name="Locations"
        component={Locations}
        initialParams={pokemonInfo}
      />
      <Tab.Screen name="Moves" component={Moves} initialParams={pokemonInfo} />
    </Tab.Navigator>
  );
}
