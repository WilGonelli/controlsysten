import { useState, useEffect } from "react";
import { ClientService } from "../services/ClientService";

export const useClientViewModel = () => {
  const [clients, setClients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValueName, setInputValueName] = useState("");

  const [inputValuePrice, setInputValuePrice] = useState(0);
  const [openDropDownPicker, setOpenDropDownPicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState("spent");
  const [optionsItems, setOptionsItems] = useState([
    { label: "Gasto", value: "spent" },
    { label: "Pago", value: "paid" },
  ]);

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

  const removeAllClients = async () => {
    await ClientService.removedb();
    fetchClients();
  };

  const updateClient = async (id) => {
    if (inputValuePrice !== 0) {
      await ClientService.updateClient(id, inputValuePrice, selectedItem);
      fetchClients();
    }
  };

  const updateClientName = async (id) => {
    await ClientService.updateClientName(id, inputValueName);
    fetchClients();
    setModalVisible(false);
  };
  const archivedClient = async (id) => {
    await ClientService.archivedClient(id);
    fetchClients();
    setModalVisible(false);
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
    setInputValueName,
    setInputValuePrice,
    setOpenDropDownPicker,
    setSelectedItem,
    setOptionsItems,
    fetchClients,
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
    createClient,
    removeAllClients,
    updateClient,
    updateClientName,
    archivedClient,
  };
};
