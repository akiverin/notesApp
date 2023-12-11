import React, { useContext, useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Note from '../components/Note';
import { NotesContext } from '../routes/AppNavigation';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const Home = () => {
   const { notes } = useContext(NotesContext);
   const navigation = useNavigation();
   const [sortType, setSortType] = useState('asc');

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

   const pressNote = (note) => {
      navigation.navigate('Note', { id: note.id, title: note.title, text: note.text, date: moment(note.date).locale('ru').format('D MMM YYYY') });
   };

   const handleSortToggle = () => {
      setSortType(prevSortType => prevSortType === 'asc' ? 'desc' : 'asc');
   };
   
   return (
      <ScrollView>
         <View style={styles.sortButtonContainer}>
            <Text style={styles.textTitle}>Мои заметки</Text>
            <TouchableOpacity style={styles.sortButton} onPress={handleSortToggle}>
               <Ionicons name={sortType === 'asc' ? 'arrow-up' : 'arrow-down'} size={20} color="#555" style={{alignSelf: 'center'}}/>
               {sortType && <Text style={{ color: '#555', fontWeight: '600', fontSize: 14 }}>{sortType === 'asc' ? 'Сначала старые' : 'Сначала новые'}</Text>}
            </TouchableOpacity>
         </View>
         <ScrollView contentContainerStyle={styles.container}>
         {sortedNotes.map((item, index) => (
            <TouchableOpacity key={index} style={(index + 1) % 5 == 3 ? styles.squareBig : styles.square} onPress={() => pressNote(item)}>
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
});

export default Home;
