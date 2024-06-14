import React, { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import { SettingsContext } from "../../routes/SettingsContext";
import { IconButton } from "./IconButton";
import { Ionicons } from "@expo/vector-icons";

const DropdownList = ({ title, content, onSelect, style, mini }) => {
  const { settings } = useContext(SettingsContext);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

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
    dropdown: {
      position: "relative",
    },
    variants: {
      width: 170,
      borderRadius: 14,
      right: 0,
      padding: 6,
      display: showDropdown ? "flex" : "none",
      position: "absolute",
      top: 46,
      flexDirection: "column",
      backgroundColor: settings.theme !== "dark" ? "white" : "#222",
      gap: 6,
    },
    item: {
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 10,
      backgroundColor: settings.theme != "dark" ? "#efefef" : "#111",
    },
  });

  const select = (value) => {
    setShowDropdown(false);
    setSelectedVariant(value);
    onSelect(value);
  };

  let buttonColor = settings.theme !== "dark" ? "#333" : "#eee";

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={[
          settings.theme == "dark" && { backgroundColor: "#000" },
          style,
          styles.theButton,
          { width: title ? "auto" : 42 },
          style
            ? null
            : {
                backgroundColor: settings.theme !== "dark" ? "#fff" : "#222",
              },
        ]}
        onPress={() => {
          setShowDropdown(!showDropdown);
          setSelectedVariant("");
        }}
        activeOpacity="0.6"
      >
        {selectedVariant == "" && (
          <Text style={{ ...styles.theText, color: buttonColor }}>{title}</Text>
        )}
        {selectedVariant != "" && (
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <View
              style={{
                backgroundColor: settings.theme !== "dark" ? "#eee" : "#161616",
                padding: 6,
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  ...styles.theText,
                  color: buttonColor,
                }}
              >
                {selectedVariant}
              </Text>
            </View>
            <Ionicons name="close" size={16} color={buttonColor} />
          </View>
        )}
      </TouchableOpacity>
      {content && (
        <View style={styles.variants}>
          {content.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  select(item);
                }}
                key={index}
                style={styles.item}
              >
                <Text style={{ ...styles.theText, color: buttonColor }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DropdownList;
