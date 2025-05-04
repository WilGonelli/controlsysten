import { Modal, View, TextInput, StyleSheet, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import Colors from "../../theme/colors";
import { styles } from "./style";

export default function ModalNewProduct({
  visible,
  onClose,
  onSave,
  inputValue1,
  inputValue2,
  inputValue3,
  inputValue4,
  setInputValue1,
  setInputValue2,
  setInputValue3,
  setInputValue4,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Digite o nome do produto"
            placeholderTextColor="#808080"
            value={inputValue1}
            onChangeText={setInputValue1}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite o tipo (ex.:lata)"
            placeholderTextColor="#808080"
            value={inputValue2}
            onChangeText={setInputValue2}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite o tamanho (ex.: 350ml)"
            placeholderTextColor="#808080"
            value={inputValue3}
            onChangeText={setInputValue3}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite o preço de venda"
            placeholderTextColor="#808080"
            keyboardType="decimal-pad"
            value={inputValue4}
            onChangeText={(text) => {
              const format = text.replace(".", ",");
              setInputValue4(format);
            }}
            style={styles.input}
          />
          <CustomButton
            text={"Salvar"}
            onPress={onSave}
            backgroundColor={Colors.primaryColor[60]}
          />
          <CustomButton
            text={"Cancelar"}
            onPress={onClose}
            backgroundColor={Colors.secundaryColor[20]}
          />
        </View>
      </View>
    </Modal>
  );
}
