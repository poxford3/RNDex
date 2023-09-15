import * as React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import TestView from "./TestView";
import APITest from "./APITest";
import Info from "./Info";

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
          // options={{ headerShown: false }}
          options={({ route }) => ({
            // title: `${
            //   route.params.pokeName[0].toUpperCase() +
            //   route.params.pokeName.substring(1)
            // }`,
            headerTitle: (
              props // App Logo
            ) => headerImage({ route }),
            headerTitleStyle: { flex: 1, textAlign: "center" },
          })}
        />
        {/* <Stack.Screen
          name="Test"
          component={TestView}
        /> */}
        <Stack.Screen name="APITest" component={APITest} />
        <Stack.Screen name="Information" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
// https://reactnavigation.org/docs/nesting-navigators/#passing-params-to-a-screen-in-a-nested-navigator
// will need the above shortly

export function PokemonBottomTabNav() {
  const headerImage = ({ route }) => {
    const pic = route.params.sprite;

    return (
      <Image
        style={{ width: 200, height: 50 }}
        source={{ uri: pic }}
        resizeMode="contain"
      />
    );
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Pokemon" component={Pokemon} />
      <Tab.Screen name="Test" component={TestView} />
    </Tab.Navigator>
  );
}
