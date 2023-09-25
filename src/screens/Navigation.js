import * as React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import Evolutions from "./Evolutions";
import TestView from "./TestView";
import APITest from "./APITest";
import Info from "./Info";
import Moves from "./Moves";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const headerImage = ({ route }) => {
    // console.log("in nav", route.params.sprite);
    // const pic = route.params.sprite;
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${route.params.id}.png`;
    // console.log(route.params.id);

    return (
      <Image
        style={{ width: 200, height: 50 }}
        source={{ uri: pic }}
        // source={require("../assets/types/dragon.png")}
        resizeMode="contain"
      />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Pokedex"
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
            headerTitle: (props) => headerImage({ route }),
          })}
        />
        <Stack.Screen name="Test" component={TestView} />
        <Stack.Screen name="APITest" component={APITest} />
        <Stack.Screen name="Information" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createMaterialBottomTabNavigator();
// https://reactnavigation.org/docs/nesting-navigators/#passing-params-to-a-screen-in-a-nested-navigator
// will need the above shortly

export function PokemonBottomTabNav({ route }) {
  let info = route.params;
  // console.log("in tab", route.params);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
