export default class Product {
  constructor(
    inputNameProduct,
    selectedProductType,
    selectedProductPack,
    sellValue
  ) {
    this.id = Date.now();
    this.name = inputNameProduct.toUpperCase();
    this.productType = selectedProductType.toUpperCase();
    this.productPack = selectedProductPack.toUpperCase();
    this.quantityBuy = 0;
    this.quantitySell = 0;
    this.avgPrice = 0;
    this.sellPrice = sellValue;
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
    const product = new Product(
      obj.name,
      obj.productType,
      obj.productPack,
      obj.sellPrice
    );

    product.id = obj.id;
    product.quantityBuy = obj.quantityBuy;
    product.quantitySell = obj.quantitySell;
    product.avgPrice = obj.avgPrice;
    product.lastTransaction = obj.lastTransaction;
    product.transactions = obj.transactions;
    return product;
  }
}
