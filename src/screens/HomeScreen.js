import React, { useContext, useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Note from '../components/Note';
import { NotesContext } from '../routes/AppNavigation';
import moment from 'moment';
import IconButton from '../components/UI/IconButton';

const Home = () => {
   const { notes, deleteNote } = useContext(NotesContext);
   const navigation = useNavigation();
   const [sortType, setSortType] = useState('asc');
   const [selectedNotes, setSelectedNotes] = useState([]);

   const pressNote = (note) => {
         navigation.navigate('NoteStack', {
            id: note.id,
            title: note.title,
            text: note.text,
            color: note.color,
            date: moment(note.date).format(),
         });
   };
   
   const sortedNotes = useMemo(() => {
      const sortFunction = (a, b) => {
         if (sortType === 'asc') {
            return a.date > b.date ? 1 : -1;
         } else if (sortType === 'desc') {
            return a.date < b.date ? 1 : -1;
         } else {
            return 0;
         }
      };
    
      const formattedNotes = notes.map(note => ({
         ...note,
         date: new Date(note.date),
      }));
    
      return formattedNotes.sort(sortFunction);
   }, [notes, sortType]);

   const handleSortToggle = () => {
      setSortType(prevSortType => prevSortType === 'asc' ? 'desc' : 'asc');
   };

   const handleDeleteNotes = () => {
      selectedNotes.forEach(noteId => deleteNote(noteId))
      setSelectedNotes([]);
   }
   
   return (
      <ScrollView>
         <View style={styles.sortButtonContainer}>
            <Text style={styles.textTitle}>Мои заметки</Text>
            {selectedNotes.length !== 0 ?
               <IconButton icon="trash" onPress={handleDeleteNotes}/>
               : 
               <IconButton icon={sortType === 'asc' ? 'arrow-up' : 'arrow-down'} title={sortType === 'asc' ? 'Сначала старые' : 'Сначала новые'} onPress={()=>handleSortToggle()}/>
            }
         </View>
         <ScrollView contentContainerStyle={styles.container}>
         {sortedNotes.map((item, index) => (
            <TouchableOpacity 
               key={index} 
               style={(index + 1) % 5 == 3 ? (selectedNotes.includes(item.id) ? {...styles.squareBig, ...styles.selectedNote} : styles.squareBig) : (selectedNotes.includes(item.id) ? {...styles.square, ...styles.selectedNote} : styles.square)}
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
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 16,
      justifyContent: 'space-between',
   },
   square: {
      width: '50%',
      height: 200,
      padding: 4,
   },
   squareBig: {
      width: '100%',
      height: 200,
      padding: 4,
   },
   sortButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 18,
   },
   sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgb(255,255,255)',
      padding: 14,
      borderRadius: 8,
      height: 46,
      justifyContent: 'center',
   },
   textTitle: {
      fontSize: 22,
      fontWeight: '400',
   },
   backButton: {
      backgroundColor: 'rgb(255,255,255)',
      padding: 10,
      borderRadius: 8,
      height: 46,
      width: 46,
      justifyContent: 'center',
  },
});

export default Home;
