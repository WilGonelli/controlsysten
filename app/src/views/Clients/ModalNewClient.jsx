import { Modal, View, TextInput, StyleSheet, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import Colors from "../../theme/colors";
import { styles } from "./style";
import globalStyle from "../../theme/globalStyle";

export default function ModalNewClient({
  visible,
  onClose,
  onSave,
  onArchived,
  inputValue,
  setInputValue,
  modalTitle,
  archivedOn,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={[globalStyle.subTitle, { color: Colors.black }]}>
            {modalTitle}:
          </Text>
          <TextInput
            placeholder="Digite o nome"
            placeholderTextColor="#808080"
            value={inputValue}
            onChangeText={setInputValue}
            style={globalStyle.input}
          />
          <CustomButton
            text={modalTitle}
            onPress={onSave}
            backgroundColor={Colors.primaryColor[60]}
          />
          {archivedOn && (
            <CustomButton
              text={`${archivedOn} cliente`}
              onPress={onArchived}
              backgroundColor={Colors.secundaryColor[60]}
            />
          )}

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
