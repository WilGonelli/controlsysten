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
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ModalNewClient({
  visible,
  onClose,
  onSave,
  onArchived,
  onDelete,
  inputValue,
  setInputValue,
  modalTitle,
  archivedOn,
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <FontAwesome style={styles.closeIcon} name="close" />
          </TouchableOpacity>
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
            <>
              <CustomButton
                text={`${archivedOn} cliente`}
                onPress={onArchived}
                backgroundColor={Colors.secundaryColor[40]}
              />

              <CustomButton
                text={"Deletar cliente"}
                onPress={onDelete}
                backgroundColor={"#FF6347"}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
