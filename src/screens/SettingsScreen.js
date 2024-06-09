import React, { useRef, useImperativeHandle, useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  Appearance,
  Image,
  Dimensions,
} from "react-native";
import IconButton from "../components/UI/IconButton";
import logo from "../../assets/logo.png";
import logoW from "../../assets/logo-w.png";

const SettingsScreen = ({ navigation }) => {
  const themeDetector = useRef();

  useImperativeHandle(themeDetector, () => ({
    getTheme() {
      const colorScheme = Appearance.getColorScheme();
      if (Platform.OS === "web" || Platform.OS === "ios") {
        return colorScheme;
      }
      if (Platform.OS === "android") {
        return colorScheme === "dark" ? "dark" : "light";
      }
      return colorScheme || "light";
    },
  }));

  useEffect(() => {
    setCurrentTheme(themeDetector.current.getTheme());
  }, [themeDetector.current]);

  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    setCurrentTheme(themeDetector.current.getTheme());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: currentTheme === "dark" ? "#111" : "#eee",
      }}
    >
      <Text style={{ color: currentTheme === "dark" ? "#fff" : "#000" }}>
        Это экран настроек
      </Text>
      <Text
        style={{
          marginBottom: 10,
          color: currentTheme === "dark" ? "#fff" : "#000",
        }}
      >
        Выбрана тема: {currentTheme}
      </Text>
      {currentTheme == "dark" ? (
        <Image
          source={logoW}
          style={{
            width: Dimensions.get("window").width - 80,
            resizeMode: "contain",
          }}
        />
      ) : (
        <Image
          source={logo}
          style={{
            width: Dimensions.get("window").width - 80,
            resizeMode: "contain",
          }}
        />
      )}
      <IconButton
        title="Сменить тему"
        onPress={() =>
          setCurrentTheme(currentTheme == "dark" ? "light" : "dark")
        }
        style={{
          backgroundColor: currentTheme == "dark" ? "#eee" : "#333",
          color: currentTheme == "dark" ? "#000" : "#fff",
          marginBottom: 10,
        }}
      />

      {/* <IconButton
        icon="chevron-back-outline"
        title="Вернуться назад"
        onPress={() => navigation.goBack()}
      /> */}
    </View>
  );
};

export default SettingsScreen;
