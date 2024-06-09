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
import moment from "moment";
import IconButton from "../components/UI/IconButton";

export function formatDate(obj) {
  const newDate = moment(obj).locale("ru").format("D MMM YYYY");
  useDebugValue({ obj, newDate });
  return newDate;
}

const NoteScreen = ({ navigation, route }) => {
  const { deleteNote } = useContext(NotesContext);
  const { id, title, text, date, color } = route.params;

  const handleEdit = () => {
    navigation.navigate("EditStack", {
      id: id,
      title: title,
      text: text,
      color: color,
      date: moment(date).locale("ru").format("D MMM YYYY"),
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
    <View style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="chevron-back-outline"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <IconButton icon="create" onPress={handleEdit} />
          <IconButton
            icon="trash"
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
        }}
      >
        {title}
      </Text>
      <ScrollView>
        <Text
          style={{
            ...styles.text,
            fontSize: windowDimensions.width < 260 ? 14 : 18,
          }}
        >
          {text}
        </Text>
      </ScrollView>
      <Text style={styles.date}>{formatDate(date)}</Text>
    </View>
  );
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
    marginVertical: 20,
    opacity: 0.5,
    paddingHorizontal: 10,
    textAlign: "right",
  },
});

export default NoteScreen;
