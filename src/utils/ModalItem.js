import React from "react";
import { Text, View, StyleSheet, Modal } from "react-native";

const ModalItem = () => {
  return (
    <Modal
      animationType={"slide"}
      visible={visible}
      transparent={true}
      onRequestClose={hideModal}
      style={styles.modalStyle}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalBox,
            {
              backgroundColor: activeColors.modal,
              borderColor: activeColors.textColor,
            },
          ]}
        >
          <Text style={{ color: activeColors.textColor }}>I'm a modal</Text>
          <View style={{ flexShrink: 1, width: 135 }}>
            <FlatList
              data={games}
              scrollEnabled={false}
              renderItem={UniqueGameItem}
            />
          </View>
          <TouchableOpacity onPress={hideModal}>
            <Text style={{ color: activeColors.textColor }}>{"\n"}close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const UniqueGameItem = ({ item }) => {
  return (
    <View
      style={{
        height: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: activeColors.textColor }}>{item}</Text>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="circle-outline"
          size={20}
          color={activeColors.textColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ModalItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
