import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import Colors from "../../theme/colors";
import { styles } from "./style";
import globalStyle from "../../theme/globalStyle";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ModalNewProduct({
  visible,
  onClose,
  onSave,
  inputNameProduct,
  setInputNameProduct,
  packSize,
  setPackSize,
  sellValue,
  setSellValue,
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
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <FontAwesome style={styles.closeIcon} name="close" />
          </TouchableOpacity>
          <TextInput
            placeholder="Produto:"
            placeholderTextColor="#808080"
            value={inputNameProduct}
            onChangeText={setInputNameProduct}
            style={globalStyle.input}
          />
          <Text style={[globalStyle.subTitle, { color: Colors.gray }]}>
            Tipo de produto:
          </Text>
          <DropDownPicker
            textStyle={[globalStyle.textItens, { color: Colors.black }]}
            open={openDropDownProductType}
            value={selectedProductType}
            items={typesProductsOptions}
            setOpen={setOpenDropDownProductType}
            setValue={setSelectedProductType}
            setItems={setTypesProductsOptions}
            placeholder="Selecione"
            zIndex={15}
          />
          {selectedProductType && selectedProductType !== "other" ? (
            <>
              <Text style={[globalStyle.subTitle, { color: Colors.gray }]}>
                Tipo de embalagem:
              </Text>
              <DropDownPicker
                textStyle={[globalStyle.textItens, { color: Colors.black }]}
                open={openDropDownProductPack}
                value={selectedProductPack}
                items={packsProductsOptions}
                setOpen={setOpenDropDownProductPack}
                setValue={setSelectedProductPack}
                setItems={setPacksProductsOptions}
                placeholder="Selecione"
                zIndex={10}
              />
            </>
          ) : (
            <></>
          )}
          <TextInput
            placeholder="Preço de venda:"
            placeholderTextColor="#808080"
            keyboardType="decimal-pad"
            value={sellValue}
            onChangeText={(text) => {
              const format = text.replace(".", ",");
              setSellValue(format);
            }}
            style={globalStyle.input}
          />
          <CustomButton
            text={"Salvar"}
            onPress={onSave}
            backgroundColor={Colors.primaryColor[60]}
          />
        </View>
      </View>
    </Modal>
  );
}
