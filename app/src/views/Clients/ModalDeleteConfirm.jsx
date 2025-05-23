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
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ModalDeleteConfirm({
  visibleDelete,
  onClose,
  onSave,
  clientName,
}) {
  return (
    <Modal visible={visibleDelete} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.modalContainer,
            { borderWidth: 5, borderColor: "#DC143C" },
          ]}
        >
          <AntDesign
            name="warning"
            style={[styles.closeIcon, { top: 10, color: "#B8860B" }]}
          />
          <Text style={[globalStyle.subTitle, { color: "#DC143C" }]}>
            Deseja realmente excluir o cliente:
          </Text>
          <Text style={[globalStyle.subTitle, { color: Colors.black }]}>
            {clientName.toUpperCase()}
          </Text>
          <CustomButton
            text={"Confirmar"}
            onPress={onSave}
            backgroundColor={"#7FFF00"}
          />
          <CustomButton
            text={"Cancelar"}
            onPress={onClose}
            backgroundColor={"#FF0000"}
          />
          <Text
            style={{
              marginTop: 20,
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            ao confirmar, todos os dados do usuário será apagado!!!
          </Text>
        </View>
      </View>
    </Modal>
  );
}
