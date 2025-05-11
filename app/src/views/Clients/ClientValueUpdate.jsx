import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ClientService } from "../../services/ClientService";
import BackgroundDefault from "../../components/Background/BackgroundDefault";
import CustomButton from "./../../components/CustomButton/index";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import ModalNewClient from "./ModalNewClient";
import ModalDeleteConfirm from "./ModalDeleteConfirm";

import { styles } from "./style";
import globalStyle from "./../../theme/globalStyle";
import Colors from "./../../theme/colors";
import { useClientViewModel } from "../../viewmodels/clientViewModel";
import { useProductViewModel } from "../../viewmodels/productViewModel";

const TransitionsItens = ({ item }) => {
  if (item.id === 0) {
    return <></>;
  }
  return (
    <View keyExtractor={item.id}>
      <View style={[globalStyle.containerItens, { height: "auto" }]}>
        <Text
          style={[
            globalStyle.textItens,
            item.type === "paid"
              ? { color: Colors.red }
              : { color: Colors.green },
            { maxWidth: "70%", flexWrap: "wrap" },
          ]}
        >
          {item.type === "paid" ? "Pago" : item.type}
        </Text>
        <Text
          style={[
            globalStyle.textItens,
            item.type === "paid"
              ? { color: Colors.red }
              : { color: Colors.green },
          ]}
        >
          R${parseFloat(item.value).toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
};

export default function ClientValueUpdate({ route }) {
  const { client } = route.params;
  const {
    inputValuePrice,
    setInputValuePrice,
    selectedItem,
    setSelectedItem,
    openDropDownPicker,
    setOpenDropDownPicker,
    optionsItems,
    setOptionsItems,
    inputValueName,
    setInputValueName,
    modalVisible,
    modalDeleteVisible,
    openConfirmModal,
    closeConfirmModal,
    updateClient,
    updateClientName,
    openModal,
    closeModal,
    archivedClient,
    removeClients,
  } = useClientViewModel();

  const {
    products,
    openDropDownProductType,
    setOpenDropDownProductType,
    selectedProductType,
    setSelectedProductType,
    typesProductsOptions,
    setTypesProductsOptions,
    fetchProducts,
    openDropDownProductSpent,
    setOpenDropDownProductSpent,
    selectedProductSpent,
    setSelectedProductSpent,
    spentProductsOptions,
    setSpentProductsOptions,
    handleOptionsInput,
    sellQuantity,
    handleQuantity,
  } = useProductViewModel();

  const navigation = useNavigation();

  useEffect(() => {
    setInputValueName(client.name);
    setInputValuePrice(client.debt * -1);
  }, []);

  return (
    <BackgroundDefault>
      <Text style={globalStyle.title}>Cliente:</Text>
      <TouchableOpacity style={globalStyle.icon} onPress={openModal}>
        <FontAwesome5 name="user-edit" style={globalStyle.icon} />
      </TouchableOpacity>
      <Text style={globalStyle.title}>{client.name}</Text>

      <Text style={[globalStyle.subTitle, { color: Colors.gray }]}>
        Operação:
      </Text>
      <DropDownPicker
        style={[styles.inputUpdateClient, { width: "100%" }]}
        textStyle={[globalStyle.textItens, { color: Colors.black }]}
        open={openDropDownPicker}
        value={selectedItem}
        items={optionsItems}
        setOpen={setOpenDropDownPicker}
        setValue={setSelectedItem}
        setItems={setOptionsItems}
        placeholder="Selecione"
      />

      {selectedItem === "paid" && (
        <>
          <Text
            style={[
              globalStyle.subTitle,
              { color: Colors.gray, marginTop: 12, position: "relative" },
            ]}
          >
            valor:
          </Text>
          <View>
            <Text style={styles.cifraoInput}>R$</Text>
            <TextInput
              style={[
                styles.inputUpdateClient,
                { paddingLeft: 80, width: "100%" },
              ]}
              value={inputValuePrice}
              onChangeText={(text) => {
                const numericText = text.replace(/\D/g, "");
                const cents = parseInt(numericText || "0", 10);
                const formatted = (cents / 100).toFixed(2).replace(".", ",");
                const format = (parseInt(cents || "0", 10) / 100)
                  .toFixed(2)
                  .replace(".", ",");
                setInputValuePrice(format);
              }}
              defaultValue={(client.debt * -1)
                .toFixed(2)
                .toString()
                .replace(".", ",")}
              inputMode="decimal"
              textAlign="left"
            />
          </View>
        </>
      )}
      {selectedItem === "spent" && (
        <>
          <Text
            style={[
              globalStyle.subTitle,
              { color: Colors.gray, marginTop: 12 },
            ]}
          >
            Categoria:
          </Text>
          <DropDownPicker
            style={[styles.inputUpdateClient, { width: "100%" }]}
            textStyle={[globalStyle.textItens, { color: Colors.black }]}
            open={openDropDownProductType}
            value={selectedProductType}
            items={typesProductsOptions}
            setOpen={setOpenDropDownProductType}
            setValue={setSelectedProductType}
            placeholder="Selecione"
            onChangeValue={(value) => {
              handleOptionsInput(value);
            }}
          />
        </>
      )}

      {selectedProductType && (
        <>
          <Text
            style={[
              globalStyle.subTitle,
              { color: Colors.gray, marginTop: 12 },
            ]}
          >
            Produto:
          </Text>
          <DropDownPicker
            style={[styles.inputUpdateClient, { width: "100%" }]}
            textStyle={[globalStyle.textItens, { color: Colors.black }]}
            open={openDropDownProductSpent}
            value={selectedProductSpent}
            items={spentProductsOptions}
            setOpen={setOpenDropDownProductSpent}
            setValue={setSelectedProductSpent}
            placeholder="Selecione"
            ListEmptyComponent={() => (
              <Text
                style={[
                  globalStyle.textItens,
                  { color: "black", padding: 12, textAlign: "center" },
                ]}
              >
                Nenhum item disponível
              </Text>
            )}
          />
        </>
      )}
      {selectedProductSpent && (
        <>
          <Text
            style={[
              globalStyle.subTitle,
              { color: Colors.gray, marginTop: 12 },
            ]}
          >
            Quantidade:
          </Text>
          <View style={[styles.inputUpdateClient, styles.quantityContainer]}>
            <TouchableOpacity onPress={() => handleQuantity("minus")}>
              <AntDesign name="minus" size={42} color="#66CDAA" />
            </TouchableOpacity>
            <Text
              style={{
                color: Colors.black,
                marginTop: 12,
                fontSize: 32,
                fontWeight: "bold",
                textAlign: "center",
                textAlignVertical: "center",
                height: "100%",
                marginTop: 0,
              }}
            >
              {sellQuantity}
            </Text>
            <TouchableOpacity onPress={() => handleQuantity("plus")}>
              <AntDesign name="plus" size={42} color="#FF4500" />
            </TouchableOpacity>
          </View>
        </>
      )}

      <CustomButton
        text={"Adicionar"}
        backgroundColor={Colors.primaryColor[60]}
        onPress={async () => {
          const updated = await updateClient(
            client.id,
            sellQuantity,
            selectedProductSpent
          );
          if (updated) {
            navigation.goBack();
          } else {
            alert("Todos os campos precisa estar preenchido");
          }
        }}
      />
      <CustomButton
        text={"Cancelar"}
        backgroundColor={Colors.gray}
        onPress={() => navigation.goBack()}
      />
      {client.transactions.length > 1 && (
        <View style={styles.transitionsHistoryClient}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                globalStyle.textCustomButton,
                {
                  width: "100%",
                  textAlign: "center",
                },
              ]}
            >
              Lista de movimentações
            </Text>
            <FlatList
              data={client.transactions}
              renderItem={({ item }) => <TransitionsItens item={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.TotalTransitions}>
            <Text style={{ fontSize: 24 }}>Saldo: R$ </Text>
            <Text
              style={[
                globalStyle.textItens,
                client.debt < 0
                  ? { color: Colors.green }
                  : { color: Colors.red },
              ]}
            >
              {parseFloat(client.debt).toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      )}
      <ModalNewClient
        visible={modalVisible}
        onClose={closeModal}
        onSave={async () => {
          await updateClientName(client.id);
          navigation.goBack();
        }}
        onArchived={async () => {
          await archivedClient(client.id);
          navigation.goBack();
        }}
        onDelete={openConfirmModal}
        inputValue={inputValueName}
        setInputValue={setInputValueName}
        modalTitle={"Atualizar cliente"}
        archivedOn={client.isArchived ? "Desarquivar" : "Arquivar"}
      />
      <ModalDeleteConfirm
        visibleDelete={modalDeleteVisible}
        onSave={async () => {
          await removeClients(client.id);
          navigation.goBack();
        }}
        onClose={closeConfirmModal}
        clientName={client.name}
      />
    </BackgroundDefault>
  );
}
