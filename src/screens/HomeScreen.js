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
import { NotesContext } from "../routes/AppNavigation";
import moment from "moment";
import IconButton from "../components/UI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { notes, deleteNote } = useContext(NotesContext);
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
    });
  };

  const sortedNotes = useMemo(() => {
    const sortFunction = (a, b) => {
      if (sortType === "asc") {
        return a.date > b.date ? 1 : -1;
      } else if (sortType === "desc") {
        return a.date < b.date ? 1 : -1;
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

  const handleSortToggle = () => {
    setSortType((prevSortType) => (prevSortType === "asc" ? "desc" : "asc"));
  };

  const handleDeleteNotes = () => {
    selectedNotes.forEach((noteId) => deleteNote(noteId));
    setSelectedNotes([]);
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
  }, []);

  return (
    <ScrollView>
      <View style={styles.sortButtonContainer}>
        <Text style={styles.textTitle}>Мои заметки</Text>
        {selectedNotes.length !== 0 ? (
          <IconButton icon="trash" onPress={handleDeleteNotes} />
        ) : (
          <IconButton
            icon={sortType === "asc" ? "arrow-up" : "arrow-down"}
            title={sortType === "asc" ? "Сначала старые" : "Сначала новые"}
            onPress={() => handleSortToggle()}
          />
        )}
      </View>
      {quote && (
        <View style={styles.quoteView}>
          <View style={{ flex: 4 }}>
            <Text style={styles.quoteTitle}>Цитата дня</Text>
            <Text style={styles.quoteAuthor}>{quoteAuthor}</Text>
          </View>
          <View style={{ flex: 10 }}>
            <Text style={styles.quoteText}>{quote}</Text>
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
            <Note title={item.title} date={item.date} color={item.color} />
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
    padding: 12,
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
    backgroundColor: "#FFE3C2",
    borderRadius: 12,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    borderColor: "#d7bf48",
    borderWidth: 1,
  },
  quoteTitle: {
    fontSize: 18,
    color: "#3D2100",
  },
  quoteText: {
    fontSize: 10.8,
    color: "#3D2100",
  },
  quoteAuthor: {
    fontSize: 12.2,
    fontWeight: "300",
    color: "#3D2100",
    marginTop: 3,
  },
});

export default Home;
