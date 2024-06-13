import React, { useContext } from "react";
import { View, Text } from "react-native";
import IconButton from "../components/UI/IconButton";
import { SettingsContext } from "../routes/SettingsContext";
const AboutScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        padding: 20,
        backgroundColor: settings.theme !== "dark" ? "#fff" : "#111",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "400",
          color: settings.theme !== "dark" ? "black" : "white",
        }}
      >
        О проекте
      </Text>
      <Text
        style={{
          textAlign: "center",
          marginBottom: 10,
          color: settings.theme !== "dark" ? "black" : "white",
        }}
      >
        Проект "Заметки: Приложение для создания и управления заметками
        пользователя" выполнен Кивериным Андреем.{" "}
      </Text>
      <IconButton
        icon="chevron-back-outline"
        title="Вернуться назад"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
export default AboutScreen;
