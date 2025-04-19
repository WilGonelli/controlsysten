// import clientsMocked from "../mocks/clientsMocked.json";

const clientsList = [];

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
    const sortedClients = clientsList.sort(
      (a, b) => b.lastTransaction - a.lastTransaction
    );
    return sortedClients;
  },
  createClient: async (name) => {
    const client = await new Client(name);
    clientsList.push(client);
  },
  updateClient: (idClient, value, typeMovimentation) => {
    const client = clientsList.find((item) => item.id === idClient);
    client.lastTransaction = Date.now();
    const newTransiotion = {
      id: client.transactions.length + 1,
      value: value,
      type: typeMovimentation,
    };
    client.transactions.push(newTransiotion);
    if (typeMovimentation === "spent") {
      client.divida -= parseFloat(value);
    }
    if (typeMovimentation === "paid") {
      client.divida += parseFloat(value);
    }
  },
};
