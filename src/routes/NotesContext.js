// NotesContext.js
import React, { useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notesReducer from "../notesReducer";

export const NotesContext = React.createContext();

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@notes", jsonValue);
  } catch (e) {
    console.error("Error saving data:", e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@notes");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading data:", e);
    return [];
  }
};

export const NotesProvider = ({ children }) => {
  const loadNotes = async () => {
    try {
      const storedNotes = await getData();
      storedNotes.forEach((item) =>
        dispatch({
          type: "added",
          id: item.id,
          title: item.title,
          text: item.text,
          color: item.color,
          date: item.date,
          mark: item.mark,
        })
      );
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const [notes, dispatch] = useReducer(notesReducer, []);

  const addNote = (newNote) => {
    dispatch({
      type: "added",
      id: notes.length > 0 ? Number(notes[notes.length - 1].id) + 1 : 0,
      title: newNote.title,
      text: newNote.text,
      color: newNote.color,
      mark: newNote.mark,
    });
  };

  const changeNote = (note) => {
    dispatch({
      type: "changed",
      note: note,
    });
  };

  const deleteNote = (noteId) => {
    dispatch({
      type: "deleted",
      id: noteId,
    });
  };

  const clearNotes = () => {
    dispatch({
      type: "clear",
    });
  };

  useEffect(() => {
    storeData(notes);
  }, [notes]);

  return (
    <NotesContext.Provider
      value={{ notes, addNote, deleteNote, changeNote, clearNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};
