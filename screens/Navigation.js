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
    const pic = route.params.params.sprite;
    // console.log(route);

    return (
      <Image
        style={{ width: 200, height: 50 }}
        source={{ uri: pic }}
        resizeMode="contain"
      />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            //   headerShown: false,
            //   gestureEnabled: false
          }
        }
        // initialRouteName="Pokedex"
        // initialRouteName="Test"
        initialRouteName="Evol"
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
            headerTitle: (
              props // App Logo
            ) => headerImage({ route }),
            headerTitleStyle: { flex: 1, textAlign: "center" },
          })}
        />
        <Stack.Screen name="Test" component={TestView} />
        <Stack.Screen name="APITest" component={APITest} />
        <Stack.Screen name="Information" component={Info} />
        <Stack.Screen name="Evol" component={Evolutions} />
        <Stack.Screen name="Move" component={Moves} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createMaterialBottomTabNavigator();
// https://reactnavigation.org/docs/nesting-navigators/#passing-params-to-a-screen-in-a-nested-navigator
// will need the above shortly

export function PokemonBottomTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Pokemon"
    >
      <Tab.Screen
        name="Pokemon"
        component={Pokemon}
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
        options={{
          tabBarLabel: "Moves",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="list" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
