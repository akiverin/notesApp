import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import "moment/locale/ru";

const Note = ({ title, date, color }) => {
  const currentYear = moment().locale("ru").format("YYYY");
  const dateYear = moment(date).locale("ru").format("YYYY");
  const dateFormat = dateYear === currentYear ? "D MMM" : "D MMM YYYY";

  const formattedDate = moment(date).locale("ru").format(dateFormat);

  const noteStyle = {
    backgroundColor: color,
    padding: 16,
    width: "100%",
    height: "100%",
    borderRadius: 14,
  };

  return (
    <View style={noteStyle}>
      <Text style={{ fontSize: 18, fontWeight: "400" }}>{title}</Text>
      <Text
        style={{
          fontSize: 18,
          opacity: 0.5,
          position: "absolute",
          bottom: 18,
          right: 18,
          fontWeight: "300",
        }}
      >
        {formattedDate}
      </Text>
    </View>
  );
};

export default Note;
