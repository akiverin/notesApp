import React, { useContext } from "react";
import { View, Text } from "react-native";
import { SettingsContext } from "../routes/SettingsContext";
import moment from "moment";
import "moment/locale/ru";
import { darkenColor } from "../utils/darkenColor";
import { Ionicons } from "@expo/vector-icons";

const Note = ({ title, date, color, mark }) => {
  const { settings } = useContext(SettingsContext);

  const currentYear = moment().locale("ru").format("YYYY");
  const dateYear = moment(date).locale("ru").format("YYYY");
  const dateFormat = dateYear === currentYear ? "D MMM" : "D MMM YYYY";
  const formattedDate = moment(date).locale("ru").format(dateFormat);

  const noteStyle = {
    backgroundColor: settings.theme !== "dark" ? color : darkenColor(color, 70),
    padding: 16,
    width: "100%",
    height: "100%",
    borderRadius: 14,
    borderWidth: mark ? settings.widthMarkBorder : settings.widthBorder,
    borderColor: settings.borderNotes ? darkenColor(color, 10) : "#00000000",
  };

  return (
    <View style={noteStyle}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "400",
          color: settings.theme !== "dark" ? "#111" : "#eee",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          bottom: 16,
          right: 18,
          alignItems: "center",
          gap: 10,
        }}
      >
        {mark && (
          <Ionicons
            name="star"
            size={10}
            color={settings.theme !== "dark" ? "#222" : color}
          />
        )}
        <Text
          style={{
            fontSize: 16,
            opacity: 0.7,
            fontWeight: "400",
            color: settings.theme !== "dark" ? "#222" : color,
          }}
        >
          {formattedDate}
        </Text>
      </View>
    </View>
  );
};

export default Note;
