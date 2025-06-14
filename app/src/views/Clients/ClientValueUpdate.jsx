import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
    descriptionOthers,
    setDescriptionOthers,
    valueOthers,
    setValueOthers,
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
    <BackgroundDefault
      headerProps={{
        title: "Clientes",
        complement: client.name,
        rightComponent: (
          <TouchableOpacity
            style={[globalStyle.icon, { zIndex: 10 }]}
            onPress={openModal}
          >
            <FontAwesome5
              name="user-edit"
              style={[globalStyle.icon, { zIndex: 1 }]}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <ScrollView>
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
          zIndex={100}
          listMode="SCROLLVIEW"
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
                  const format = (parseInt(cents || "0", 10) / 100)
                    .toFixed(2)
                    .replace(".", ",");
                  setInputValuePrice(format);
                }}
                defaultValue={
                  client.debt < 0
                    ? (client.debt * -1).toFixed(2).toString().replace(".", ",")
                    : 0
                }
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
              listMode="SCROLLVIEW"
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
              zIndex={90}
            />
          </>
        )}
        {selectedItem === "spent" && selectedProductType === "other" && (
          <>
            <Text
              style={[
                globalStyle.subTitle,
                { color: Colors.gray, marginTop: 12, position: "relative" },
              ]}
            >
              Descrição:
            </Text>
            <View>
              <TextInput
                style={[
                  styles.inputUpdateClient,
                  { paddingLeft: 12, width: "100%" },
                ]}
                value={descriptionOthers}
                onChangeText={setDescriptionOthers}
                textAlign="left"
              />
            </View>
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
                value={valueOthers}
                onChangeText={(text) => {
                  const numericText = text.replace(/\D/g, "");
                  const cents = parseInt(numericText || "0", 10);
                  const format = (parseInt(cents || "0", 10) / 100)
                    .toFixed(2)
                    .replace(".", ",");
                  setValueOthers(format);
                }}
                inputMode="decimal"
                textAlign="left"
              />
            </View>
          </>
        )}

        {selectedItem === "spent" &&
          selectedProductType &&
          selectedProductType !== "other" && (
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
                listMode="SCROLLVIEW"
                style={[styles.inputUpdateClient, { width: "100%" }]}
                textStyle={[globalStyle.textItens, { color: Colors.black }]}
                open={openDropDownProductSpent}
                value={selectedProductSpent}
                items={spentProductsOptions}
                setOpen={setOpenDropDownProductSpent}
                setValue={setSelectedProductSpent}
                placeholder="Selecione"
                zIndex={80}
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
        {selectedItem === "spent" && selectedProductSpent && (
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
              <TouchableOpacity
                onPress={() => handleQuantity("minus", selectedProductSpent)}
              >
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
              <TouchableOpacity
                onPress={() => handleQuantity("plus", selectedProductSpent)}
              >
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
              selectedProductSpent,
              selectedProductType
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
            <ScrollView style={{ height: 290 }}>
              {client.transactions.map((t) => (
                <TransitionsItens key={t.id} item={t} />
              ))}
              
            </ScrollView>
            <View style={styles.TotalTransitions}>
              <Text style={{ fontSize: 24 }}>Saldo: R$ </Text>
              <Text
                style={[
                  globalStyle.textItens,
                  client.debt < 0
                    ? { color: Colors.green }
                    : { color: Colors.red },
                  { fontSize: 24 },
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
            const res = await updateClientName(client.id);
            if (res) {
              navigation.goBack();
            } else {
              alert("Nome Invalido");
            }
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
      </ScrollView>
    </BackgroundDefault>
  );
}
