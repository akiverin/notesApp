import React, { useContext, useState, useMemo, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Note from "../components/Note";
import { NotesContext } from "../routes/NotesContext";
import { SettingsContext } from "../routes/SettingsContext";
import moment from "moment";
import IconButton from "../components/UI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkenColor } from "../utils/darkenColor";
import DropdownList from "../components/UI/DropdownList";

const Home = () => {
  const { notes, deleteNote } = useContext(NotesContext);
  const { settings } = useContext(SettingsContext);
  const navigation = useNavigation();
  const [sortType, setSortType] = useState("asc");
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [quoteDate, setQuoteDate] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");

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

  const sortedNotes = useMemo(() => {
    const sortFunction = (a, b) => {
      if (sortType === "asc") {
        return a.date > b.date ? 1 : -1;
      } else if (sortType === "desc") {
        return a.date < b.date ? 1 : -1;
      } else if (sortType === "important") {
        if (a.mark === b.mark) {
          return 0;
        } else if (a.mark && !b.mark) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    };

    const formattedNotes = notes.map((note) => ({
      ...note,
      date: new Date(note.date),
    }));

    return formattedNotes.sort(sortFunction);
  }, [notes, sortType]);

  const handleSortToggle = (value) => {
    console.log(value);
    if (value === "От новых к старым") {
      setSortType("desc");
    } else if (value === "От старых к новым") {
      setSortType("asc");
    } else if (value === "Сначала важное") {
      setSortType("important");
    }
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const today = moment().format("YYYY-MM-DD");
        const storedQuoteDate = await AsyncStorage.getItem("quoteDate");
        const storedQuote = await AsyncStorage.getItem("quote");
        const storedQuoteAuthor = await AsyncStorage.getItem("quoteAuthor");

        if (storedQuote && storedQuoteDate === today) {
          setQuote(storedQuote);
          setQuoteDate(storedQuoteDate);
          setQuoteAuthor(storedQuoteAuthor);
          console.log("Current settings:", settings);
        } else {
          const response = await fetch(
            "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru",
            {
              method: "GET",
              contentType: "application/json",
            }
          );
          const result = await response.json();
          console.log(result);

          if (result) {
            const newQuote = result.quoteText;
            setQuote(newQuote);
            setQuoteDate(today);
            setQuoteAuthor(result.quoteAuthor);
            await AsyncStorage.setItem("quote", newQuote);
            await AsyncStorage.setItem("quoteDate", today);
            await AsyncStorage.setItem("quoteAuthor", result.quoteAuthor);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuote();
  }, [settings]);

  return (
    <ScrollView style={settings.theme == "dark" && { backgroundColor: "#111" }}>
      <View style={styles.sortButtonContainer}>
        <Text
          style={[
            styles.textTitle,
            settings.theme == "dark" && { color: "#fff" },
          ]}
        >
          Мои заметки
        </Text>
        {/* <IconButton
          icon={sortType === "asc" ? "arrow-up" : "arrow-down"}
          title={sortType === "asc" ? "Сначала старые" : "Сначала новые"}
          onPress={() => handleSortToggle()}
        /> */}
        <DropdownList
          title="Сортировка"
          content={["От новых к старым", "От старых к новым", "Сначала важное"]}
          onSelect={handleSortToggle}
        />
      </View>
      {settings.quote && quote && (
        <View
          style={{
            ...styles.quoteView,
            backgroundColor: settings.theme !== "dark" ? "#FFE3C2" : "#402D00",
          }}
        >
          <View style={styles.quoteContent}>
            <Text
              style={{ color: settings.theme !== "dark" ? "#000" : "#fff" }}
            >
              Цитата дня
            </Text>
            <Text
              style={{
                ...styles.quoteAuthor,
                color: settings.theme !== "dark" ? "#000" : "#fff",
              }}
            >
              {quoteAuthor}
            </Text>
          </View>
          <View style={styles.quoteTextView}>
            <Text
              style={{
                ...styles.quoteText,
                color: settings.theme !== "dark" ? "#000" : "#fff",
              }}
            >
              {quote}
            </Text>
          </View>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.container}>
        {sortedNotes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={
              (index + 1) % 5 == 3
                ? selectedNotes.includes(item.id)
                  ? { ...styles.squareBig, ...styles.selectedNote }
                  : styles.squareBig
                : selectedNotes.includes(item.id)
                ? { ...styles.square, ...styles.selectedNote }
                : styles.square
            }
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingBottom: 100,
    paddingTop: 8,
    justifyContent: "space-between",
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
  sortButtonContainer: {
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 16,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgb(255,255,255)",
    padding: 14,
    borderRadius: 8,
    height: 46,
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "400",
  },
  backButton: {
    backgroundColor: "rgb(255,255,255)",
    padding: 10,
    borderRadius: 8,
    height: 46,
    width: 46,
    justifyContent: "center",
  },
  quoteView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    borderColor: "#d7bf48",
    borderWidth: 1,
  },
  quoteTextView: {
    flexShrink: 1,
    flexGrow: 1,
  },
  quoteTitle: {
    fontSize: 18,
    color: "#3D2100",
  },
  quoteText: {
    display: "flex",
    fontSize: 10.8,
    color: "#3D2100",
  },
  quoteAuthor: {
    fontSize: 12.2,
    fontWeight: "300",
    opacity: 0.8,
    marginTop: 3,
  },
});

export default Home;
