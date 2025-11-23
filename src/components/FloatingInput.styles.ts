import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
  },
  textInput: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
    errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  countryCode: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
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
    borderColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
  },
});