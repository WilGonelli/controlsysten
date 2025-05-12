import { useState, useEffect } from "react";
import { ProductService } from "../services/ProductService";

export const useProductViewModel = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputNameProduct, setInputNameProduct] = useState("");
  const [packSize, setPackSize] = useState("");
  const [sellValue, setSellValue] = useState(null);
  const [openDropDownProductType, setOpenDropDownProductType] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [typesProductsOptions, setTypesProductsOptions] = useState([
    { label: "Cerveja", value: "beer" },
    { label: "Refrigerante", value: "refrigerator" },
    { label: "outros", value: "other" },
  ]);
  const [openDropDownProductPack, setOpenDropDownProductPack] = useState(false);
  const [selectedProductPack, setSelectedProductPack] = useState(null);
  const [packsProductsOptions, setPacksProductsOptions] = useState([
    { label: "garrafa 600ml", value: "garrafa 600ml" },
    { label: "garrafa 2lt", value: "garrafa 2lt" },
    { label: "lata 350ml", value: "lata 350ml" },
    { label: "longneck 330ml", value: "longneck 330ml" },
    { label: "gorduchinha 300ml", value: "gorduchinha 300ml" },
    { label: "ks 290ml", value: "ks 290ml" },
    { label: "outros", value: "outros" },
  ]);

  const [openDropDownOperation, setOpenDropDownOperation] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [oprationsOption, setOperationsOption] = useState([
    { label: "Venda", value: "sell" },
    { label: "Compra", value: "buy" },
  ]);

  const [openDropDownType, setOpenDropDownType] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [typesOption, setTypesOption] = useState([
    { label: "Unidade", value: "unit" },
    { label: "Fardo", value: "pack" },
  ]);

  const [packQuantity, setPackQuantity] = useState(0);
  const [quantityPerPack, setQuantityPerPack] = useState(0);
  const [quantityUnits, setQuantityUnits] = useState(0);
  const [priceValue, setPriceValue] = useState(0);

  const [openDropDownProductSpent, setOpenDropDownProductSpent] =
    useState(false);
  const [selectedProductSpent, setSelectedProductSpent] = useState(null);
  const [spentProductsOptions, setSpentProductsOptions] = useState([]);
  const [sellQuantity, setSellQuantity] = useState(1);

  const fetchProducts = async (productRender) => {
    const data = await ProductService.getAllProducts();
    let dataToReturn = [];
    if (productRender === "cervejas" || productRender === "beer") {
      const dataFiltred = await data.filter((product) => {
        return product.productType === "BEER";
      });
      setProducts(dataFiltred);
      dataToReturn = dataFiltred;
    } else if (
      productRender === "refrigerantes" ||
      productRender === "refrigerator"
    ) {
      const dataFiltred = await data.filter((product) => {
        return product.productType === "REFRIGERATOR";
      });
      setProducts(dataFiltred);
      dataToReturn = dataFiltred;
    } else if (productRender === "outros" || productRender === "other") {
      const dataFiltred = await data.filter((product) => {
        return product.productType === "OTHER";
      });
      setProducts(dataFiltred);
      dataToReturn = dataFiltred;
    }
    return dataToReturn;
  };

  const handleOptionsInput = async (productRender) => {
    const findProducts = await fetchProducts(productRender);
    const data = [];
    await findProducts.map((product) => {
      if (product.quantityBuy - product.quantitySell > 0) {
        data.push({
          label: `${product.name} ${product.productPack}`,
          value: product.id,
        });
      }
    });
    setSpentProductsOptions(data);
  };

  const handleQuantity = async (operation) => {
    if (operation === "plus" && sellQuantity >= 0) {
      setSellQuantity(sellQuantity + 1);
    } else if (operation === "minus" && sellQuantity > 0) {
      setSellQuantity(sellQuantity - 1);
    }
  };

  const createProduct = async () => {
    if (parseFloat(sellValue.replace(",", ".")).toFixed(2) < 0) {
      alert("O valor não pode ser menor que 0");
      return;
    }
    if (
      inputNameProduct &&
      parseFloat(sellValue.replace(",", ".")).toFixed(2) > 0 &&
      (selectedProductType === "other" || selectedProductPack)
    ) {
      await ProductService.createProduct(
        inputNameProduct,
        selectedProductType,
        selectedProductPack ? selectedProductPack : "",
        parseFloat(sellValue.replace(",", ".")).toFixed(2)
      );
      setInputNameProduct("");
      setSelectedProductType(null);
      setSelectedProductPack(null);
      setSellValue("");
      setModalVisible(false);
      fetchProducts();
    } else {
      alert("Todos os campos precisam ser preenchidos");
    }
  };

  const addTransactions = async (id, operationType) => {
    if (
      parseFloat(quantityUnits) > 0 &&
      parseFloat(priceValue.replace(",", ".")) > 0
    ) {
      await ProductService.updateProduct(
        id,
        operationType,
        parseFloat(quantityUnits),
        parseFloat(priceValue.replace(",", ".")).toFixed(2)
      );
      fetchProducts();
    }
  };

  const removeProducts = async () => {
    await ProductService.removeProducts();
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    modalVisible,
    inputNameProduct,
    packSize,
    sellValue,
    setInputNameProduct,
    setPackSize,
    setSellValue,
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
    createProduct,
    fetchProducts,
    removeProducts,
    openDropDownProductType,
    setOpenDropDownProductType,
    selectedProductType,
    setSelectedProductType,
    typesProductsOptions,
    setTypesProductsOptions,
    openDropDownProductPack,
    setOpenDropDownProductPack,
    selectedProductPack,
    setSelectedProductPack,
    packsProductsOptions,
    setPacksProductsOptions,

    openDropDownProductType,
    setOpenDropDownProductType,
    selectedProductType,
    setSelectedProductType,
    typesProductsOptions,
    setTypesProductsOptions,

    openDropDownType,
    setOpenDropDownType,
    selectedType,
    setSelectedType,
    typesOption,
    setTypesOption,

    packQuantity,
    setPackQuantity,
    quantityPerPack,
    setQuantityPerPack,
    quantityUnits,
    setQuantityUnits,
    priceValue,
    setPriceValue,

    addTransactions,
    openDropDownProductSpent,
    setOpenDropDownProductSpent,
    selectedProductSpent,
    setSelectedProductSpent,
    spentProductsOptions,
    setSpentProductsOptions,
    handleOptionsInput,
    sellQuantity,
    handleQuantity,
  };
};
