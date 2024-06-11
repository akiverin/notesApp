import React, {
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  View,
  Text,
  Platform,
  Appearance,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import IconButton from "../components/UI/IconButton";
import logo from "../../assets/logo.png";
import logoW from "../../assets/logo-w.png";
import { SettingsContext } from "../routes/SettingsContext";
import { NotesContext } from "../routes/NotesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const themeDetector = useRef();
  const { settings, changeSettings, resetSettings } =
    useContext(SettingsContext);
  const { clearNotes } = useContext(NotesContext);

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

  const deleteAllNotes = () => {
    // AsyncStorage.removeItem("@notes");
    clearNotes();
  };

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: currentTheme == "dark" ? "#eee" : "#333",
      color: currentTheme == "dark" ? "#000" : "#fff",
      marginBottom: 10,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: currentTheme === "dark" ? "#111" : "#eee",
      }}
    >
      <Text
        style={{
          marginBottom: 10,
          color: currentTheme === "dark" ? "#fff" : "#000",
        }}
      >
        Выбрана тема: {currentTheme}
      </Text>
      <Text
        style={{
          marginBottom: 10,
          color: currentTheme === "dark" ? "#fff" : "#000",
        }}
      >
        Цитата {settings.quote && "не "}была скрыта
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
        title={
          "Включить " +
          (settings.theme == "dark" ? "светлую тему" : "темную тему")
        }
        onPress={() => {
          setCurrentTheme(currentTheme == "dark" ? "light" : "dark");
          changeSettings("theme", currentTheme == "dark" ? "light" : "dark");
        }}
        style={styles.btn}
      />
      <IconButton
        title={(settings.quote ? "Скрыть" : "Показать") + " цитату"}
        onPress={() => changeSettings("quote", !settings.quote)}
        style={styles.btn}
      />
      <IconButton
        title={
          (settings.borderNotes ? "Убрать" : "Добавить") + " обводку заметок"
        }
        onPress={() => changeSettings("borderNotes", !settings.borderNotes)}
        style={styles.btn}
      />
      <IconButton
        title={"Сбросить настройки"}
        onPress={() => resetSettings()}
        style={styles.btn}
      />
      <IconButton
        title={"Удалить все заметки"}
        onPress={() => deleteAllNotes()}
        style={{
          backgroundColor: currentTheme == "dark" ? "#FF3B3B" : "#FF3B3B",
          color: "#fff",
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
