import {
  loadClients,
  storageClients,
  clearStorageClient,
} from "./DbLocalStorage";
import Client from "../models/clientModel";

export const ClientService = {
  getAllClients: async () => {
    const rawList = await loadClients();
    const clientList = rawList.map(Client.fromObject);
    return clientList.sort((a, b) => b.lastTransaction - a.lastTransaction);
  },

  createClient: async (name) => {
    const client = new Client(name);
    const clientList = await ClientService.getAllClients();
    clientList.push(client);
    await storageClients(clientList);
  },

  updateClient: async (idClient, value, type) => {
    const clientList = await ClientService.getAllClients();
    const client = clientList.find((c) => c.id === idClient);
    if (client) {
      client.addTransaction(value, type);
      await storageClients(clientList);
    }
  },

  updateClientName: async (idClient, clientName) => {
    const clientList = await ClientService.getAllClients();
    const client = clientList.find((c) => c.id === idClient);
    if (client) {
      client.name = clientName;
      await storageClients(clientList);
    }
  },

  archivedClient: async (idClient) => {
    const clientList = await ClientService.getAllClients();
    const client = clientList.find((c) => c.id === idClient);
    if (client) {
      client.isArchived = true;
      await storageClients(clientList);
    }
  },

  removedb: async () => {
    await clearStorageClient();
  },
};
