import React, { useContext, useState } from 'react';
import { View, Platform, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../routes/AppNavigation';

const EditNoteScreen = ({ navigation, route }) => {
   const note = route.params;
   const [title, setTitle] = useState(note.title);
   const [text, setText] = useState(note.text);
   const [inputHeight, setInputHeight] = useState(40);
   const { changeNote } = useContext(NotesContext);

   const handleEdit = () => {
      const editedNote = {
            id: note.id,
            title: title,
            text: text,
      };
      changeNote(editedNote);
      navigation.navigate('Home');
   };

   return (
      <View style={{ flex: 1, padding: 16 }}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, }}>
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
               <Ionicons name="chevron-back-outline" size={22} color="#555" style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
               <Ionicons name="save" size={22} color="#555" style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
         </View>
         <Text style={styles.date}>{note.date}</Text>
         <TextInput
            style={[styles.titleInput,{height: inputHeight}]}
            multiline={true}
            numberOfLines={4}
            onContentSizeChange={(e) => {
               setInputHeight(e.nativeEvent.contentSize.height);
            }}
            placeholderTextColor={styles.placeholder.color}
            placeholder="Заголовок заметки"
            value={title}
            onChangeText={(newTitle) => { if (newTitle.length <= 40) { setTitle(newTitle) } }}
         />
         <TextInput
            style={styles.textInput}
            placeholderTextColor={styles.placeholder.color}
            placeholder="Текст заметки"
            multiline={true}
            value={text}
            onChangeText={setText}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
   },
   header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
   },
   headerText: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   backButton: {
      backgroundColor: 'rgb(255,255,255)',
      padding: 10,
      borderRadius: 8,
      height: 46,
      width: 46,
      justifyContent: 'center',
   },
   saveButton: {
      backgroundColor: 'rgb(255,255,255)',
      padding: 14,
      borderRadius: 8,
      height: 46,
      justifyContent: 'center',
   },
   titleInput: {
      height: 40,
      paddingHorizontal: 10,
      borderWidth: 0,
      fontSize: 36,
      backgroundColor: 'transparent',
      fontWeight: '400',
      marginBottom: 20,
      ...Platform.select({
         web: {
            outlineWidth: 0
         },
         default: {
            borderWidth: 0
         }
      })
   },
   textInput: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      textAlignVertical: 'top',
      borderWidth: 0,
      fontSize: 20,
      lineHeight: '150%',
      ...Platform.select({
         web: {
            outlineWidth: 0
         },
         default: {
            borderWidth: 0
         }
      })
   },
   placeholder: {
      color: 'rgba(0, 0, 0, 0.5)',
   },
   colorButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 20,
   },
   date: {
      paddingHorizontal: 10,
      marginTop: 20,
      marginBottom: 4, 
      opacity: 0.5,
      textAlign: 'end',
   },
});


export default EditNoteScreen;
