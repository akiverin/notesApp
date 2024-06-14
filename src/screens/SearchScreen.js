import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import IconButton from "../components/UI/IconButton";
import { SettingsContext } from "../routes/SettingsContext";
import { NotesContext } from "../routes/NotesContext";
import Note from "../components/Note";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { debounce, fuzzySearch } from "../utils/search";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const { settings } = useContext(SettingsContext);
  const { notes } = useContext(NotesContext);
  const [filterNotes, setFilterNotes] = useState(notes);

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim() === "") {
        setFilterNotes(notes);
      } else {
        const filtered = notes.filter(
          (note) =>
            fuzzySearch(searchTerm, note.title) ||
            fuzzySearch(searchTerm, note.text)
        );
        setFilterNotes(filtered);
      }
    }, 300),
    [notes]
  );

  useEffect(() => {
    setFilterNotes(notes);
  }, [notes]);

  const pressNote = (note) => {
    navigation.navigate("NoteStack", {
      id: note.id,
      title: note.title,
      text: note.text,
      color: note.color,
      date: moment(note.date).format(),
      mark: note.mark,
    });
  };

  return (
    <View
      style={{
        display: "flex",
        padding: 16,
        height: "100%",
        backgroundColor: settings.theme !== "dark" ? "#fff" : "#111",
      }}
    >
      <View style={styles.searchBox}>
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: settings.theme !== "dark" ? "#fff" : "#222",
            borderColor: settings.theme !== "dark" ? "#ddd" : "#303030",
            color: settings.theme !== "dark" ? "#000" : "#fff",
          }}
          placeholder="Поиск заметок"
          placeholderTextColor={settings.theme !== "dark" ? "#888" : "#555"}
          value={search}
          onChangeText={setSearch}
        />
        <IconButton
          style={{
            backgroundColor: "rgb(10,132,255)",
            color: "#FFF",
          }}
          icon="search"
          iconColor="white"
          onPress={() => handleSearch(search)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {filterNotes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={(index + 1) % 5 == 3 ? styles.square : styles.square}
            onPress={() => pressNote(item)}
          >
            <Note
              title={item.title}
              date={item.date}
              color={item.color}
              mark={item.mark}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 70,
    paddingTop: 8,
    // height: "100%",
    justifyContent: "space-between",
  },
  input: {
    height: 42,
    borderColor: "#EBEBEB",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 10,
    shadowColor: "white",
  },
  square: {
    width: "50%",
    height: 180,
    padding: 4,
  },
  squareBig: {
    width: "100%",
    height: 180,
    padding: 4,
  },
});

export default SearchScreen;
