import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.inputBackgroundLight,
  },
  textInput: {
    fontSize: 16,
    color: Colors.textDark,
    flex: 1,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: Colors.borderLight,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.backdrop,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.surfaceLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "50%",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  modalItemText: {
    fontSize: 16,
  },
});
