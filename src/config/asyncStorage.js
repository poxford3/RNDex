import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch ({ message }) {
    console.log("async error", message);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch ({ message }) {
    console.log("async error", message);
  }
};

// will show all stored data
// AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (error, stores) => {
//     stores.map((result, i, store) => {
//       console.log("Async Keys", { [store[i][0]]: store[i][1] });
//       return true;
//     });
//   });
// });

// will remove an entire key worth of storage data
// const removeItemValue = async (key) => {
//   try {
//     await AsyncStorage.removeItem(key);
//     return true;
//   } catch (exception) {
//     return false;
//   }
// };

// removeItemValue("first_time");

// clearAllData() {
//   AsyncStorage.getAllKeys()
//   .then(keys => AsyncStorage.multiRemove(keys))
//   .then(() => alert('success'));
// }
