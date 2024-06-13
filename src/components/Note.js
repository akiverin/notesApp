import React, { useContext } from "react";
import { View, Text } from "react-native";
import { SettingsContext } from "../routes/SettingsContext";
import moment from "moment";
import "moment/locale/ru";
import { darkenColor } from "../utils/darkenColor";

const Note = ({ title, date, color }) => {
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
    borderWidth: 1,
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
      <Text
        style={{
          fontSize: 18,
          opacity: 0.7,
          position: "absolute",
          bottom: 18,
          right: 18,
          fontWeight: "300",
          color: settings.theme !== "dark" ? "#222" : color,
        }}
      >
        {formattedDate}
      </Text>
    </View>
  );
};

export default Note;
