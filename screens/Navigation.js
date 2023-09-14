import * as React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import TestView from "./TestView";
import APITest from "./APITest";
import Info from "./Info";

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
        // initialRouteName="Test"
      >
        <Stack.Screen
          name="Pokedex"
          component={Pokedex}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pokemon"
          component={Pokemon}
          // options={({ route }) => ({
          //   title: `${
          //     route.params.pokeName[0].toUpperCase() +
          //     route.params.pokeName.substring(1)
          //   }`,
          // })}
          options={{
            headerTitle: (
              props // App Logo
            ) => (
              <Image
                // style={{ width: 200, height: 50 }}
                source={require("../assets/arse.jpeg")}
                // source={{ uri: props.children }}
                resizeMode="contain"
              />
            ),
            headerTitleStyle: { flex: 1, textAlign: "center" },
          }}
        />
        <Stack.Screen
          name="Test"
          component={TestView}
          //   options={{ headerShown: false }}
        />
        <Stack.Screen
          name="APITest"
          component={APITest}
          //   options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Information"
          component={Info}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
