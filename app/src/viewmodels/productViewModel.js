import { useState, useEffect } from "react";
import { ProductService } from "../services/ProductService";

export const useProductViewModel = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");

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

  const fetchProducts = async () => {
    const data = await ProductService.getAllProducts();
    setProducts(data);
  };

  const createProduct = async () => {
    if (
      !inputValue1.trim() &&
      !inputValue2.trim() &&
      !inputValue3.trim() &&
      !inputValue4.trim()
    ) {
      return;
    }
    await ProductService.createProduct(
      inputValue1,
      inputValue2,
      inputValue3,
      parseFloat(inputValue4.replace(",", ".")).toFixed(2)
    );
    setInputValue1("");
    setInputValue2("");
    setInputValue3("");
    setInputValue4("");
    setModalVisible(false);
    fetchProducts();
  };

  const addTransactions = async (id) => {
    if (selectedType === "pack") {
      await setQuantityUnits(packQuantity * quantityPerPack);
    }
    await ProductService.updateProduct(
      id,
      selectedOperation,
      parseFloat(quantityUnits),
      parseFloat(priceValue.replace(",", ".")).toFixed(2)
    );
    fetchProducts();
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
    inputValue1,
    inputValue2,
    inputValue3,
    inputValue4,
    setInputValue1,
    setInputValue2,
    setInputValue3,
    setInputValue4,
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
    createProduct,
    fetchProducts,
    removeProducts,

    openDropDownOperation,
    setOpenDropDownOperation,
    selectedOperation,
    setSelectedOperation,
    oprationsOption,
    setOperationsOption,

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
  };
};
