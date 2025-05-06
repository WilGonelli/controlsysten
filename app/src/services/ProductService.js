import {
  loadProducts,
  storageProducts,
  clearStorageProduct,
} from "./DbLocalStorage";
import Product from "./../models/productModel";

export const ProductService = {
  getAllProducts: async () => {
    const rawList = await loadProducts();
    const productList = rawList.map(Product.fromObject);
    return productList.sort((a, b) => a.amount - b.amount);
  },

  createProduct: async (name, type, size, sellPrice) => {
    const product = new Product(name, type, size, parseFloat(sellPrice));
    const productList = await ProductService.getAllProducts();
    productList.push(product);
    await storageProducts(productList);
  },

  updateProduct: async (
    idProduct,
    transactionType,
    transactionAmount,
    transactionUnitPrice
  ) => {
    const productList = await ProductService.getAllProducts();
    const product = productList.find((c) => c.id === idProduct);
    if (product) {
      product.addTransaction(
        transactionType,
        transactionAmount,
        transactionUnitPrice
      );
      await storageProducts(productList);
    }
  },

  removeProducts: async () => {
    await clearStorageProduct();
  },
};
