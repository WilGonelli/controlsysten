export default class Product {
  constructor(name, type, size, sellPrice) {
    this.id = Date.now();
    this.name = name.toUpperCase();
    this.type = type.toUpperCase();
    this.size = size.toUpperCase();
    this.amount = 0;
    this.quantityBuy = 0;
    this.quantitySell = 0;
    this.avgPrice = 0;
    this.sellPrice = sellPrice;
    this.lastTransaction = Date.now();
    this.transactions = [
      { id: 0, transactionType: "create", amount: 0, price: 0 },
    ];
  }

  addTransaction(transactionType, transactionAmount, transactionUnitPrice) {
    const transactionUpdate = {
      id: this.transactions.length,
      transactionType: transactionType,
      amount: transactionAmount,
      price: transactionUnitPrice,
    };

    this.transactions.push(transactionUpdate);
    this.lastTransaction = Date.now();

    if (transactionType === "sell") {
      this.amount -= transactionAmount;
      this.sellPrice = transactionUnitPrice;
      this.quantitySell += transactionAmount;
    } else if (transactionType === "buy") {
      this.amount += transactionAmount;

      this.avgPrice =
        (this.avgPrice * this.quantityBuy +
          transactionUnitPrice * transactionAmount) /
        (this.quantityBuy + transactionAmount);

      this.quantityBuy += transactionAmount;
    }
  }

  static fromObject(obj) {
    const product = new Product(obj.name, obj.type, obj.size);
    product.id = obj.id;
    product.amount = obj.amount;
    product.quantityBuy = obj.quantityBuy;
    product.quantitySell = obj.quantitySell;
    product.avgPrice = obj.avgPrice;
    product.sellPrice = obj.sellPrice;
    product.lastTransaction = obj.lastTransaction;
    product.transactions = obj.transactions;
    return product;
  }
}
