import Toast from "react-native-toast-message";

export const showErrorToast = (message: string, title: string = "Error") => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};

export const showSuccessToast = (message: string, title: string = "Success") => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 3000,
  });
};