import { Modal, View, TextInput, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import Colors from "../../theme/colors";
import { styles } from "./style";

export default function ModalNewClient({
  visible,
  onClose,
  onSave,
  inputValue,
  setInputValue,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Digite o Nome"
            value={inputValue}
            onChangeText={setInputValue}
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
