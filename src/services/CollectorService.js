import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import appConfig from "../configs/app.config";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "../constants/api.constant";
import store from "../store";
import { onSignOutSuccess } from "../store/auth/sessionSlice";

export const createCollect = async (data) => {
  const collectsStrings = await AsyncStorage.getItem("collects");
  let collectsInJSON =
    collectsStrings != null ? JSON.parse(collectsStrings) : [];

  let newCollections = [data, ...collectsInJSON];

  await AsyncStorage.setItem("collects", JSON.stringify(newCollections));

  // let newCollectionss = await AsyncStorage.getItem("collects");
};

export const updateCollect = async (data) => {
  const collectsStrings = await AsyncStorage.getItem("collects");
  let collectsInJSON =
    collectsStrings != null ? JSON.parse(collectsStrings) : [];

  let newCollections = collectsInJSON.map((value) => {
    if (data?.id_operation === value?.id_operation) {
      return data;
    }

    return value;
  });

  await AsyncStorage.setItem("collects", JSON.stringify(newCollections));

  // let newCollectionss = await AsyncStorage.getItem("collects");
};

export const clearCollect = async () => {
  await AsyncStorage.setItem("collects", JSON.stringify([]));
};

export const getAllCollectByType = async (type) => {
  try {
    const collectsStrings = await AsyncStorage.getItem("collects");
    let collectsInJSON =
      collectsStrings != null ? JSON.parse(collectsStrings) : [];

    return collectsInJSON.filter((value) => value.goal == type);
  } catch (e) {
    // error reading value
  }
};

export const getAllCollectByTypeAndQuery = async (type, query) => {
  try {
    let queryText = query.toLowerCase();
    const collectsStrings = await AsyncStorage.getItem("collects");
    let collectsInJSON =
      collectsStrings != null ? JSON.parse(collectsStrings) : [];

    return collectsInJSON.filter(
      (value) =>
        value.goal == type &&
        (value.asset.toLowerCase().includes(queryText.toLowerCase()) ||
          value.data3.toLowerCase().includes(queryText.toLowerCase()) ||
          value.data6.toLowerCase().includes(queryText.toLowerCase()))
    );
  } catch (e) {
    // error reading value
  }
};

export const getAllCollects = async (type) => {
  try {
    const collectsStrings = await AsyncStorage.getItem("collects");
    let collectsInJSON = JSON.parse(collectsStrings);

    return collectsInJSON;
  } catch (e) {
    // error reading value
  }
};

export const getAllCollectByTypeAndCurrency = async (type, currency) => {
  try {
    const collectsStrings = await AsyncStorage.getItem("collects");
    let collectsInJSON =
      collectsStrings != null ? JSON.parse(collectsStrings) : [];

    return collectsInJSON.filter(
      (value) => value.typeOperation == type && value.currency == currency
    );
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

/**
 * =================================================
 * CUSTOM BASE SERVICE FOR URL WITHOUT BASE_URL
 * =========================================
 */

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  headers,
});

BaseService.interceptors.request.use(
  (config) => {
    // const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    // const persistData = deepParseJson(rawPersistData);

    // let accessToken = persistData.auth.session.token;
    // let accessToken = false;

    // if (!accessToken) {
    // }

    const { auth } = store.getState();
    accessToken = auth.session.token;

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(onSignOutSuccess());
    }

    return Promise.reject(error);
  }
);

export async function apiSyncData(url, data) {
  return BaseService.post(url, data);
}
