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
import Setting from "../components/Setting";

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

  // useEffect(() => {
  //   setCurrentTheme(themeDetector.current.getTheme());
  // }, [themeDetector.current]);

  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    setCurrentTheme(themeDetector.current.getTheme());
  }, []);

  const deleteAllNotes = () => {
    clearNotes();
  };

  const settingsList = [
    {
      display: "theme",
      name: "Цветовая тема",
      content: [
        { title: "Светлая", value: "light" },
        { title: "Темная", value: "dark" },
      ],
    },
    {
      display: "quote",
      name: "Цитата дня",
      content: [
        { title: "Включена", value: true },
        { title: "Отключена", value: false },
      ],
    },
    {
      display: "borderNotes",
      name: "Обводка заметок",
      content: [
        { title: "Включена", value: true },
        { title: "Отключена", value: false },
      ],
    },
  ];

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: currentTheme == "dark" ? "#eee" : "#333",
      color: currentTheme == "dark" ? "#000" : "#fff",
      marginBottom: 10,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: 12,
      paddingBottom: 100,
      paddingTop: 8,
      justifyContent: "space-between",
    },
    textTitle: {
      marginVertical: 18,
      width: "100%",
      fontSize: 22,
      fontWeight: "400",
    },
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: settings.theme === "dark" ? "#111" : "#eee",
        paddingBottom: 100,
        paddingHorizontal: 12,
      }}
    >
      <Text
        style={[
          styles.textTitle,
          settings.theme == "dark" && { color: "#fff" },
        ]}
      >
        Настройки
      </Text>
      {settingsList.map((item, index) => {
        return (
          <Setting
            name={item.name}
            content={item.content}
            active={settings[item.display]}
            key={index}
            theme={settings.theme}
            onSelect={(value) => changeSettings(item.display, value)}
          />
        );
      })}
      {settings.theme == "dark" ? (
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
        title={"Сбросить настройки"}
        onPress={() => resetSettings()}
        style={styles.btn}
      />
      <IconButton
        title={"Удалить все заметки"}
        onPress={() => deleteAllNotes()}
        style={{
          backgroundColor: settings.theme == "dark" ? "#FF3B3B" : "#FF3B3B",
          color: "#fff",
          marginBottom: 10,
        }}
      />
    </View>
  );
};

export default SettingsScreen;
