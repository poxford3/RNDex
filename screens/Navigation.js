import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import TestView from "./TestView";

const Stack = createNativeStackNavigator();

export default function MyStack() {
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
      >
        <Stack.Screen
          name="Pokedex"
          component={Pokedex}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pokemon"
          component={Pokemon}
          options={({ route }) => ({
            title: `${
              route.params.pokeName[0].toUpperCase() +
              route.params.pokeName.substring(1)
            }`,
          })}
        />
        <Stack.Screen
          name="Test"
          component={TestView}
          //   options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
