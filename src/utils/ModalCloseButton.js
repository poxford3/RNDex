import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ModalCloseButton({ navigation }) {
  // const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ position: "absolute", zIndex: 1000, top: 10, right: 10 }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <MaterialCommunityIcons name="close-circle" size={30} color="grey" />
    </TouchableOpacity>
  );
}
