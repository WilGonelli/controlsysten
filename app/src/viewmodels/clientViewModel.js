import { useState, useEffect } from "react";
import { ClientService } from "../services/ClientService";

export const useClientViewModel = () => {
  const [clients, setClients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fetchClients = async () => {
    const data = await ClientService.getAllClients();
    setClients(data);
  };

  const createClient = async () => {
    if (!inputValue.trim()) return;
    await ClientService.createClient(inputValue);
    setInputValue("");
    setModalVisible(false);
    fetchClients();
  };

  const removeAllClients = async () => {
    await ClientService.removedb();
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    modalVisible,
    inputValue,
    setInputValue,
    openModal: () => setModalVisible(true),
    closeModal: () => setModalVisible(false),
    createClient,
    removeAllClients,
  };
};
