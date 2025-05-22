import { useState, useEffect } from "react";
import { ClientService } from "../services/ClientService";
import { ProductService } from "../services/ProductService";

export const useClientViewModel = () => {
  const [clients, setClients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [inputValueName, setInputValueName] = useState("");

  const [inputValuePrice, setInputValuePrice] = useState("");
  const [openDropDownPicker, setOpenDropDownPicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [optionsItems, setOptionsItems] = useState([
    { label: "Gasto", value: "spent" },
    { label: "Pago", value: "paid" },
  ]);

  const [descriptionOthers, setDescriptionOthers] = useState(null);
  const [valueOthers, setValueOthers] = useState(null);

  const fetchClients = async (clientsToRender = "recentes") => {
    const data = await ClientService.getAllClients();
    if (clientsToRender === "recentes") {
      const dataFiltred = await data.filter(
        (client) => client.isArchived === false
      );
      setClients(
        dataFiltred.sort((a, b) => {
          if (b.debt !== 0) {
            return b.lastTransaction - a.lastTransaction;
          }
          return a.lastTransaction - b.lastTransaction;
        })
      );
    } else {
      const dataFiltred = await data.filter(
        (client) => client.isArchived === true
      );
      setClients(
        dataFiltred.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      );
    }
  };

  const createClient = async () => {
    if (!inputValueName.trim()) return;
    await ClientService.createClient(inputValueName);
    setInputValueName("");
    setModalVisible(false);
    fetchClients();
  };

  const removeClients = async (id) => {
    await ClientService.removeClient(id);
    setModalDeleteVisible(false);
    fetchClients();
  };

  const updateClient = async (
    id,
    sellQuantity,
    selectedProductSpent,
    selectedProductType
  ) => {
    if (selectedItem === "spent") {
      if (!id || !selectedProductType) {
        return false;
      }
      if (selectedProductType === "other") {
        if (valueOthers && selectedItem && descriptionOthers) {
          await ClientService.updateClient(
            id,
            parseFloat(valueOthers.replace(",", ".")).toFixed(2),
            selectedItem,
            `${descriptionOthers}`
          );
          return true;
        } else {
          return false;
        }
      } else {
        if (sellQuantity && selectedItem && selectedProductSpent) {
          const product = await ProductService.productFind(
            selectedProductSpent
          );
          await ClientService.updateClient(
            id,
            sellQuantity * product.sellPrice,
            selectedItem,
            `${sellQuantity} ${product.name} ${product.productPack}`
          );
          await ProductService.updateProduct(
            selectedProductSpent,
            "sell",
            sellQuantity,
            product.sellPrice
          );
          return true;
        } else {
          return false;
        }
      }
    } else {
      const formatNumber =
        typeof inputValuePrice === "number"
          ? inputValuePrice.toFixed(2)
          : parseFloat(inputValuePrice.replace(",", ".")).toFixed(2);
      if (formatNumber > 0) {
        await ClientService.updateClient(id, inputValuePrice, selectedItem, "");
      }
      fetchClients();
      return true;
    }
  };

  const updateClientName = async (id) => {
    if (inputValueName) {
      await ClientService.updateClientName(id, inputValueName);
      setModalVisible(false);
      fetchClients();
      return true;
    } else {
      return false;
    }
  };
  const archivedClient = async (id) => {
    await ClientService.archivedClient(id);
    setModalVisible(false);
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    modalVisible,
    inputValueName,
    inputValuePrice,
    selectedItem,
    openDropDownPicker,
    optionsItems,
    modalDeleteVisible,
    setInputValueName,
    setInputValuePrice,
    setOpenDropDownPicker,
    setSelectedItem,
    setOptionsItems,
    fetchClients,
    openConfirmModal: () => setModalDeleteVisible(true),
    closeConfirmModal: () => setModalDeleteVisible(false),
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
    createClient,
    removeClients,
    updateClient,
    updateClientName,
    archivedClient,
    descriptionOthers,
    setDescriptionOthers,
    valueOthers,
    setValueOthers,
  };
};
