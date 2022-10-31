import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Pokedex from "./Pokedex";
import TestView from "./TestView";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pokedex"
          component={Pokedex}
          options={{ headerShown: false }}
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
