import AsyncStorage from "@react-native-async-storage/async-storage";

export const createCollect = async (data) => {
  const collectsStrings = await AsyncStorage.getItem("collects");
  let collectsInJSON =
    collectsStrings != null ? JSON.parse(collectsStrings) : [];

  let newCollections = [data, ...collectsInJSON];

  await AsyncStorage.setItem("collects", JSON.stringify(newCollections));

  let newCollectionss = await AsyncStorage.getItem("collects");

  console.log(newCollectionss);
};

export const getAllCollects = async () => {
  try {
    const collectsStrings = await AsyncStorage.getItem("collects");
    return collectsStrings != null ? JSON.parse(collectsStrings) : [];
  } catch (e) {
    // error reading value
  }
};

export const getAllCollectByType = async (type) => {
  try {
    const collectsStrings = await AsyncStorage.getItem("collects");
    let collectsInJSON = collectsStrings != null ? JSON.parse(collectsStrings) : [];

    console.log(collectsStrings);

    return collectsInJSON.filter((value) => value.typeOperation == type);
  } catch (e) {
    // error reading value
  }
};

export const getCollectParams = async (type = null) => {
  try {
    const collectsStrings = await AsyncStorage.getItem("collects");
    let collectsInJSON = collectsStrings != null ? JSON.parse(jsonValue) : [];
    if (type != null) {
      collectsInJSON = collectsInJSON.filter(
        (value) => value.typeOperation == type
      );
    }

    let amount = collectsInJSON.reduce(
      (previous, current) => previous + parseFloat(current.amount),
      0
    );

    return {
      amount,
      length: collectsInJSON.length,
    };
  } catch (e) {
    // error reading value
  }
};
