import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SettingsContext } from "../routes/SettingsContext";
import moment from "moment";
import "moment/locale/ru";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./UI/IconButton";

const Setting = ({ name, content, active, onSelect, theme }) => {
  const styles = StyleSheet.create({
    settingStyle: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      width: "100%",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme !== "dark" ? "#c4c4c4" : "#333",
      backgroundColor: theme !== "dark" ? "#e0e0e0" : "#222",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    settingName: {
      fontSize: 16,
      fontWeight: "400",
      color: theme !== "dark" ? "black" : "white",
    },
  });

  return (
    <View style={styles.settingStyle}>
      <Text style={styles.settingName}>{name}</Text>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {content.map((item, index) => {
          return (
            <IconButton
              key={index}
              title={item.title}
              onPress={() => onSelect(item.value)}
              mini={true}
              style={{
                backgroundColor:
                  active == item.value ? "rgb(10,132,255)" : "#eee",
                color: active == item.value ? "white" : "black",
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Setting;
