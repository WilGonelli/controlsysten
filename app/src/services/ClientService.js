import { loadClients, storageClients, clearStorage } from "./DbLocalStorage";

class Client {
  constructor(name) {
    (this.id = Date.now()), (this.name = name);
    this.debt = 0.0;
    this.lastTransaction = Date.now();
    this.transactions = [
      {
        id: 0,
        value: 0.0,
        type: "initial",
      },
    ];
  }
}
export const ClientService = {
  getAllClients: async () => {
    const clientList = await loadClients();
    return clientList;
  },

  createClient: async (name) => {
    const client = await new Client(name);
    const clientList = await loadClients();
    clientList.push(client);
    await storageClients(clientList);
  },

  updateClient: async (idClient, value, typeMovimentation) => {
    const clientList = await loadClients();
    const client = clientList.find((item) => item.id === idClient);
    client.lastTansition = Date.now();
    const transitionsToSave = {
      id: client.transactions.length,
      value: value,
      type: typeMovimentation,
    };
    client.transactions.push(transitionsToSave);
    if (typeMovimentation === "spent") {
      client.debt -= parseFloat(value);
    }
    if (typeMovimentation === "paid") {
      client.debt += parseFloat(value);
    }
    await storageClients(clientList);
  },

  removedb: async () => {
    await clearStorage();
  },
};
