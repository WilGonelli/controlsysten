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
    return productList.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  },

  productFind: async (idProduct) => {
    const data = await ProductService.getAllProducts();
    const product = data.find((item) => item.id === idProduct);
    return product;
  },

  createProduct: async (
    inputNameProduct,
    selectedProductType,
    selectedProductPack = "",
    sellValue
  ) => {
    const product = new Product(
      inputNameProduct,
      selectedProductType,
      selectedProductPack,
      parseFloat(sellValue)
    );
    const productList = await ProductService.getAllProducts();
    productList.push(product);
    await storageProducts(productList);
  },

  updateProduct: async (
    idProduct,
    operationType,
    transactionAmount,
    transactionUnitPrice
  ) => {
    const productList = await ProductService.getAllProducts();
    const product = productList.find((c) => c.id === idProduct);
    if (product) {
      product.addTransaction(
        operationType,
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
