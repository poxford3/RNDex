import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderImage from "../utils/HeaderImage";
import { ThemeContext } from "../contexts/ThemeContext";

import Pokedex from "./Pokedex";
import TestView from "./TestView";
import APITest from "./APITest";
import Info from "./Info";
import GenerationList from "./GenerationList";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const mode = useContext(ThemeContext);
  let activeColors = theme[mode.theme];

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Pokedex"
        // initialRouteName="Test"
        screenOptions={{
          headerColor: activeColors.background,
        }}
        options={{
          headerStyle: {
            backgroundColor: activeColors.backgroud,
          },
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
            headerTitle: (props) => <HeaderImage route={route} />,
            headerStyle: {
              backgroundColor: activeColors.backgroud,
            },
          })}
        />
        <Stack.Screen name="Test" component={TestView} />
        <Stack.Screen name="APITest" component={APITest} />
        <Stack.Screen name="Information" component={Info} />
        <Stack.Screen name="Gens" component={GenerationList} />
      </Stack.Navigator>
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
  const mode = useContext(ThemeContext);
  let activeColors = theme[mode.theme];
  // console.log("in tab", route.params);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarOptions: {
          backgroundColor: activeColors.background,
        },
      }}
      initialRouteName="Pokemon"
      initialParams={info}
    >
      <Tab.Screen
        name="Pokemon"
        component={Pokemon}
        initialParams={info}
        options={{
          tabBarLabel: "Info",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Evol"
        component={Evolutions}
        initialParams={info}
        options={{
          tabBarLabel: "Evolutions",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="duck" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Locs"
        component={Locations}
        initialParams={info}
        options={{
          tabBarLabel: "Locations",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Moves"
        component={Moves}
        initialParams={info}
        options={{
          tabBarLabel: "Moves",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="abacus" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
