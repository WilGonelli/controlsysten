import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_KEY = "@clients";
const PRODUCT_KEY = "@products";

export const loadClients = async () => {
  try {
    const data = await AsyncStorage.getItem(CLIENT_KEY);
    return data != null ? JSON.parse(data) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const storageClients = async (clientList) => {
  try {
    const data = JSON.stringify(clientList);
    await AsyncStorage.setItem(CLIENT_KEY, data);
  } catch (e) {
    console.error(e);
  }
};

export const clearStorageClient = async () => {
  try {
    await AsyncStorage.clear(CLIENT_KEY);
  } catch (e) {
    console.error(e);
  }
};

export const loadProducts = async () => {
  try {
    const data = await AsyncStorage.getItem(PRODUCT_KEY);
    return data != null ? JSON.parse(data) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const storageProducts = async (productList) => {
  try {
    const data = JSON.stringify(productList);
    await AsyncStorage.setItem(PRODUCT_KEY, data);
  } catch (e) {
    console.error(e);
  }
};

export const clearStorageProduct = async () => {
  try {
    await AsyncStorage.clear(PRODUCT_KEY);
  } catch (e) {
    console.error(e);
  }
};
