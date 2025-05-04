export default class Client {
  constructor(name) {
    this.id = Date.now();
    this.name = name;
    this.debt = 0.0;
    this.lastTransaction = Date.now();
    this.isArchived = false;
    this.transactions = [
      {
        id: 0,
        value: 0.0,
        type: "initial",
      },
    ];
  }

  addTransaction(value, type) {
    const transaction = {
      id: this.transactions.length,
      value: parseFloat(value),
      type,
    };

    this.transactions.push(transaction);
    this.lastTransaction = Date.now();

    if (type === "spent") {
      this.debt -= transaction.value;
    } else if (type === "paid") {
      this.debt += transaction.value;
    }
  }

  static fromObject(obj) {
    const client = new Client(obj.name);
    client.id = obj.id;
    client.debt = obj.debt;
    client.lastTransaction = obj.lastTransaction;
    client.isArchived = obj.isArchived;
    client.transactions = obj.transactions;
    return client;
  }
}
