import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderImage from "../utils/HeaderImage";
import { StatusBar, Text } from "react-native";
import themeColors from "../styles/themeColors";
import { ThemeContext } from "../contexts/ThemeContext";
import { PokemonContext } from "../contexts/PokemonContext";
import { getData } from "../config/asyncStorage";
import capitalizeString from "../hooks/capitalizeString";

import Pokedex from "./Pokedex";
import TestView from "./TestView";
import Info from "./Info";
import GenerationList from "./GenerationList";
import Settings from "./Settings";
import Natures from "./Natures";
import FavoritePokemon from "./FavoritePokemon";
import MatchupChart from "./MatchupChart";

import MoveDetails from "../utils/MoveDetails";
import AbilityDetails from "../utils/AbilityDetails";
import LoadingView from "../utils/LoadingView";
import FirstTimeView from "./FirstTimeView";

import AllLists from "../utils/ListViews/AllLists";
import ItemView from "../utils/ListViews/ItemView";
import AbilityView from "../utils/ListViews/AbilityView";
import LocationView from "../utils/ListViews/LocationView";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  // console.log("nav", initRoute);
  const { theme } = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const pokemonInfo = useContext(PokemonContext).pokemon;

  const [initRouteName, setInitRouteName] = useState(null);

  const CheckUserFirstTime = async () => {
    // setInitRouteName("LoadingView");
    let tempName;
    // let isFirstTime = await getData("first_time").then((e) => {
    await getData("first_time")
      .then((e) => {
        // console.log("e", e);
        if (e == "completed") {
          // console.log("PD", 1);
          tempName = "Pokedex";
        } else {
          // console.log("FTV", 2);
          tempName = "FirstTimeView";
        }
      })
      .finally(() => {
        // console.log("finally", tempName);
        setInitRouteName(tempName);
      });
  };
  useEffect(() => {
    CheckUserFirstTime();
  }, []);

  if (initRouteName == null) {
    return <LoadingView />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initRouteName}
        // initialRouteName="Test"
        screenOptions={{
          headerTintColor: activeColors.textColor,
          headerStyle: { backgroundColor: activeColors.background },
        }}
      >
        <Stack.Screen
          name="FirstTimeView"
          component={FirstTimeView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pokedex"
          component={Pokedex}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="PokemonTabNav"
          component={PokemonBottomTabNav}
          options={({ route }) => ({
            headerTitle: (props) => <HeaderImage id={pokemonInfo.id} />,
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="Test"
          component={TestView}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Information" component={Info} />
        <Stack.Screen name="Gens" component={GenerationList} />
        <Stack.Screen name="Favorites" component={FavoritePokemon} />
        <Stack.Screen name="Natures" component={Natures} />
        <Stack.Screen name="MatchupChart" component={MatchupChart} />
        <Stack.Screen
          name="All Lists"
          component={AllLists}
          options={({ route }) => ({
            title: route.params.list_data.title,
          })}
        />
        <Stack.Screen
          name="ItemView"
          component={ItemView}
          options={({ route }) => ({
            title: capitalizeString(route.params.route.name),
          })}
        />
        <Stack.Screen
          name="AbilityView"
          component={AbilityView}
          options={({ route }) => ({
            title: capitalizeString(route.params.route.name),
          })}
        />
        <Stack.Screen
          name="LocationView"
          component={LocationView}
          options={({ route }) => ({
            title: capitalizeString(route.params.route.name),
          })}
        />
        <Stack.Group
          screenOptions={{ presentation: "modal", headerShown: false }}
        >
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="MoveDetails" component={MoveDetails} />
          <Stack.Screen name="AbilityDetails" component={AbilityDetails} />
        </Stack.Group>
      </Stack.Navigator>
      <StatusBar
        barStyle={activeColors.barStyle}
        backgroundColor={activeColors.background}
      />
    </NavigationContainer>
  );
}

import Pokemon from "./Pokemon";
import Evolutions from "./Evolutions";
import Locations from "./Locations";
import Moves from "./Moves";

const Tab = createMaterialBottomTabNavigator();

export function PokemonBottomTabNav() {
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
