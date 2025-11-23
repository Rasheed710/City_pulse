import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  KeyboardTypeOptions,
} from "react-native";
import { styles } from "./FloatingInput.styles";

interface FloatingInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  isPhone?: boolean; 
  error?: string; 
}

const countries = [
  { code: "+1", name: "USA" },
  { code: "+91", name: "India" },
  { code: "+44", name: "UK" },
  { code: "+61", name: "Australia" },
  { code: "+971", name: "UAE" },
];

const FloatingLabelInput: React.FC<FloatingInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  isPhone = false,
  error = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");
  const [modalVisible, setModalVisible] = useState(false);

  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute",
    left: 16,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -6],
    }),
    fontSize: 16,
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#f3f5f7ff"],
    }),
    paddingHorizontal: 0,
  };
const renderItem = useCallback(
  ({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCode(item?.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item?.name} ({item?.code})</Text>
                </TouchableOpacity>
              ),[countries]
            )

  return (
    <View style={{ paddingTop: 16, marginBottom: 12 }}>
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <View style={[styles.input, { flexDirection: "row", alignItems: "center" }]}>
        {isPhone && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.countryCode}
          >
            <Text style={{ fontSize: 16 }}>{selectedCode}</Text>
          </TouchableOpacity>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.textInput, isPhone && { flex: 1 ,marginLeft: 8 }]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={isFocused || value ? "" : placeholder}
          placeholderTextColor="#aaa"
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country Code</Text>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={renderItem}
            />
            <TouchableOpacity
              style={[styles.modalItem, { justifyContent: "center" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalItemText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default memo(FloatingLabelInput)