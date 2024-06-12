import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { View, TextInput, Platform, StyleSheet } from "react-native";
import { NotesContext } from "../routes/NotesContext";
import ColorPicker from "../components/ColorPicker";
import IconButton from "../components/UI/IconButton";
import { SettingsContext } from "../routes/SettingsContext";

const NewNote = ({ navigation }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [inputHeight, setInputHeight] = useState(43);
  const { settings } = useContext(SettingsContext);

  const inputRef = useRef(null);

  const { addNote } = useContext(NotesContext);

  const handleColorSelect = useCallback(
    (color) => {
      setSelectedColor(color);
      setColorPickerVisible(false);
    },
    [setSelectedColor, setColorPickerVisible]
  );

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      inputRef.current && inputRef.current.focus();
    });
    return focusListener;
  }, [navigation]);

  const saveNote = () => {
    const newNote = {
      title: title,
      text: text,
      date: new Date(),
      color: selectedColor == null ? "#e0e0e0" : selectedColor.color,
    };
    addNote(newNote);
    setTitle("");
    setText("");
    setInputHeight(43);
    setSelectedColor(null);
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    headerText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    backButton: {
      backgroundColor: "rgb(255,255,255)",
      padding: 10,
      borderRadius: 8,
      height: 46,
      width: 46,
      justifyContent: "center",
    },
    saveButton: {
      backgroundColor: "rgb(255,255,255)",
      padding: 14,
      borderRadius: 8,
      height: 46,
      justifyContent: "center",
    },
    titleInput: {
      height: 40,
      paddingHorizontal: 10,
      borderWidth: 0,
      fontSize: 30,
      backgroundColor: "transparent",
      color: settings.theme !== "dark" ? "black" : "white",
      fontWeight: "400",
      marginBottom: 20,
      ...Platform.select({
        web: {
          outlineWidth: 0,
        },
        default: {
          borderWidth: 0,
        },
      }),
    },
    textInput: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      paddingHorizontal: 10,
      textAlignVertical: "top",
      color: settings.theme !== "dark" ? "black" : "white",
      borderWidth: 0,
      fontSize: 20,
      ...Platform.select({
        web: {
          outlineWidth: 0,
        },
        default: {
          borderWidth: 0,
        },
      }),
    },
    placeholder: {
      color:
        settings.theme !== "dark"
          ? "rgba(0, 0, 0, 0.5)"
          : "rgba(255, 255, 255, 0.5)",
    },
    colorButton: {
      backgroundColor: "#007bff",
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 20,
    },
  });

  return (
    <View
      style={[
        styles.container,
        settings.theme == "dark" && { backgroundColor: "#111" },
      ]}
    >
      <View style={styles.header}>
        <IconButton
          icon="chevron-back-outline"
          onPress={() => navigation.goBack()}
        />
        <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <IconButton
            title="Цвет"
            style={{
              backgroundColor:
                selectedColor !== null
                  ? selectedColor.color
                  : settings.theme !== "dark"
                  ? "#fff"
                  : "#1e1e1e",
              color: settings.theme !== "dark" ? "#555" : "#bbb",
            }}
            onPress={() => setColorPickerVisible(true)}
          />
          <IconButton
            title="Сохранить"
            onPress={saveNote}
            style={{ backgroundColor: "rgb(36,138,61)", color: "#FFF" }}
          />
        </View>
      </View>
      <TextInput
        style={[styles.titleInput, { height: inputHeight }]}
        multiline={true}
        numberOfLines={4}
        onContentSizeChange={(e) => {
          setInputHeight(Math.max(e.nativeEvent.contentSize.height, 43));
        }}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Заголовок заметки"
        value={title}
        maxLength={64}
        onChangeText={(newTitle) => {
          //   if (newTitle.length <= 40) {
          setTitle(newTitle);
          //   }
        }}
        ref={inputRef}
      />
      <TextInput
        style={styles.textInput}
        placeholderTextColor={styles.placeholder.color}
        placeholder="Текст заметки"
        multiline={true}
        value={text}
        onChangeText={setText}
      />
      <ColorPicker
        visible={colorPickerVisible}
        onClose={() => setColorPickerVisible(false)}
        onColorSelect={handleColorSelect}
      />
    </View>
  );
};

export default NewNote;
