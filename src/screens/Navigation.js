import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderImage from "../utils/HeaderImage";
import { StatusBar } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";

import Pokedex from "./Pokedex";
import TestView from "./TestView";
import APITest from "./APITest";
import Info from "./Info";
import GenerationList from "./GenerationList";
import Settings from "./Settings";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const pokemonInfo = useContext(PokemonContext).pokemon;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Pokedex"
        screenOptions={{
          headerTintColor: activeColors.textColor,
          headerStyle: { backgroundColor: activeColors.background },
        }}
        // initialRouteName="Test"
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

export function PokemonBottomTabNav({ route }) {
  let info = route.params;
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const { pokemonInfo } = useContext(PokemonContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
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
        // tabBarActiveTintColor: activeColors.textColor,
        // tabBarInactiveTintColor: "gray",
      }}
      initialRouteName="Pokemon"
      // initialParams={info}
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
