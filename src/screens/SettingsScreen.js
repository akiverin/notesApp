import React, {
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  useContext,
} from "react";
import { View, Text, Platform, Appearance, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { SettingsContext } from "../routes/SettingsContext";
import { NotesContext } from "../routes/NotesContext";
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
    {
      display: "widthBorder",
      name: "Толщина обводки заметок",
      content: [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "3", value: 3 },
      ],
    },
    {
      display: "widthMarkBorder",
      name: "Толщина обводки Важное",
      content: [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "3", value: 3 },
        { title: "4", value: 4 },
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
      paddingBottom: 20,
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
        height: "100%",
        alignItems: "center",
        backgroundColor: settings.theme === "dark" ? "#111" : "#eee",
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
      <IconButton
        title={"Сбросить настройки"}
        onPress={() => resetSettings()}
        style={{ ...styles.btn, marginTop: 40 }}
      />
      <IconButton
        title={"Удалить все заметки"}
        onPress={() => deleteAllNotes()}
        style={{
          backgroundColor: settings.theme == "dark" ? "#FF3B3B" : "#FF3B3B",
          color: "#fff",
        }}
      />
    </View>
  );
};

export default SettingsScreen;
