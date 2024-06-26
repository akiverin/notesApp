import React, {
  useState,
  useContext,
  useDebugValue,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { NotesContext } from "../routes/NotesContext";
import { SettingsContext } from "../routes/SettingsContext";
import moment from "moment";
import "moment/locale/ru";
import IconButton from "../components/UI/IconButton";
import { Ionicons } from "@expo/vector-icons";

export function formatDate(obj) {
  const newDate = moment(obj).locale("ru").format("D MMM YYYY");
  useDebugValue({ obj, newDate });
  return newDate;
}

const NoteScreen = ({ navigation, route }) => {
  const { deleteNote } = useContext(NotesContext);
  const { settings } = useContext(SettingsContext);
  const { id, title, text, date, color, mark } = route.params;

  const handleEdit = () => {
    navigation.navigate("EditStack", {
      id: id,
      title: title,
      text: text,
      color: color,
      date: moment(date).locale("ru").format("D MMM YYYY"),
      mark: mark,
    });
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
  };

  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );

  useLayoutEffect(() => {
    function updateDimensions() {
      setWindowDimensions(Dimensions.get("screen"));
    }

    if (Platform.OS === "web") {
      Dimensions.addEventListener("change", updateDimensions);

      return () => {
        Dimensions.removeEventListener("change", updateDimensions);
      };
    } else {
      updateDimensions();

      return () => {};
    }
  }, [windowDimensions]);

  return (
    <View
      style={[
        {
          height: "100%",
          padding: 12,
        },
        settings.theme == "dark" && { backgroundColor: "#111" },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton icon="chevron-left" onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <IconButton icon="note-edit" onPress={handleEdit} />
          <IconButton
            icon="delete"
            onPress={() => {
              handleDelete(id);
              navigation.goBack();
            }}
          />
        </View>
      </View>
      <Text
        style={{
          ...styles.title,
          fontSize: windowDimensions.width < 260 ? 24 : 32,
          color: settings.theme !== "dark" ? "black" : "white",
        }}
      >
        {title}
      </Text>
      <ScrollView>
        <Text
          style={{
            ...styles.text,
            fontSize: windowDimensions.width < 260 ? 14 : 18,
            color: settings.theme !== "dark" ? "black" : "white",
          }}
        >
          {text}
        </Text>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 10,
          marginBottom: 100,
          opacity: 0.5,
          paddingHorizontal: 12,
        }}
      >
        {mark && (
          <Ionicons
            name="star"
            size={10}
            color={settings.theme !== "dark" ? "#222" : "white"}
          />
        )}
        <Text
          style={{
            ...styles.date,
            color: settings.theme !== "dark" ? "black" : "white",
          }}
        >
          {formatDate(date)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  iconButton: {
    backgroundColor: "rgb(255,255,255)",
    padding: 10,
    borderRadius: 8,
    height: 46,
    width: 46,
    justifyContent: "center",
  },
  title: {
    paddingHorizontal: 10,
    borderWidth: 0,
    fontSize: 32,
    backgroundColor: "transparent",
    fontWeight: "400",
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    paddingHorizontal: 10,
    lineHeight: 26,
    fontSize: 18,
  },
  date: {
    opacity: 0.5,
    textAlign: "right",
  },
});

export default NoteScreen;
