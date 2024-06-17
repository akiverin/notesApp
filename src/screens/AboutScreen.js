import React, { useContext } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import IconButton from "../components/UI/IconButton";
import { SettingsContext } from "../routes/SettingsContext";
import logo from "../../assets/logo.png";
import logoW from "../../assets/logo-w.png";
const AboutScreen = ({ navigation }) => {
  const { settings } = useContext(SettingsContext);
  return (
    <View
      style={{
        height: "100%",
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
      {settings.theme == "dark" ? (
        <Image
          source={logoW}
          style={{
            width: Dimensions.get("window").width - 80,
            resizeMode: "contain",
            opacity: 1,
          }}
        />
      ) : (
        <Image
          source={logo}
          style={{
            width: Dimensions.get("window").width - 80,
            resizeMode: "contain",
            opacity: 1,
          }}
        />
      )}
      <IconButton
        icon="chevron-left"
        title="Вернуться назад"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
export default AboutScreen;
