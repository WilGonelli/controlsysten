import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadClients = async () => {
  try {
    const data = await AsyncStorage.getItem("@clients");
    return data != null ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const storageClients = async (clientList) => {
  try {
    const data = JSON.stringify(clientList);
    await AsyncStorage.setItem("@clients", data);
  } catch (e) {
    console.log(e);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error("Erro ao limpar o armazenamento:", e);
  }
};
