import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../routes/SettingsContext";

const IconButton = ({ icon, title, onPress, style, mini }) => {
  const { settings } = useContext(SettingsContext);
  const styles = StyleSheet.create({
    theButton: {
      flexDirection: "row",
      gap: 10, //расстояние между иконкой и тектом
      alignItems: "center", //выравнивание контента по центру горизонтали
      paddingHorizontal: 10, //поле от границ кнопки
      borderRadius: 8, //скругленность кнопки
      height: mini ? 36 : 42,
      width: mini ? 36 : 42,
      justifyContent: "center", //выравнивание контента по центру
      boxShadow:
        "0px 2px 10px 0px #00000008, 0px -7px 17px -4px #00000010 inset", //тени для кнопки для разных ОС
      ...Platform.select({
        ios: {
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    theText: {
      fontWeight: "600",
      fontSize: 14,
      textShadowColor: "rgba(0, 0, 0, 0.06)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
  });
  let buttonColor = style
    ? style.color
      ? style.color
      : "#555555"
    : settings.theme !== "dark"
    ? "#555"
    : "#bbb";
  return (
    <TouchableOpacity
      style={[
        settings.theme == "dark" && { backgroundColor: "#000" },
        style,
        styles.theButton,
        { width: title ? "auto" : 42 },
        style
          ? null
          : {
              backgroundColor: settings.theme !== "dark" ? "#fff" : "#1e1e1e",
            },
      ]}
      onPress={onPress}
      activeOpacity="0.6"
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={settings.theme !== "dark" ? "#555" : "#bbb"}
          style={{ alignSelf: "center" }}
        />
      )}
      {title && (
        <Text style={[styles.theText, { color: buttonColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
