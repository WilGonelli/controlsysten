import clientsMocked from "../mocks/clientsMocked.json";

const clientsList = [...clientsMocked];

class Client {
  constructor(name) {
    (this.id = Date.now()), (this.name = name);
    this.divida = 0.0;
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
  getAllClients: () => {
    return clientsList;
  },
  createClient: (name) => {
    const client = new Client(name);
    clientsList.push(client);
  },
};
