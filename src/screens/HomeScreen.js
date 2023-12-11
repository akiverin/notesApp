import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Note from '../components/Note';
import { NotesContext } from '../routes/AppNavigation';
import moment from 'moment';

const Home = () => {
   const { notes } = useContext(NotesContext);
   const navigation = useNavigation();

   const pressNote = (note) => {
      navigation.navigate('Note', { id: note.id, title: note.title, text: note.text, date: moment(note.date).locale('ru').format('D MMM YYYY') });
   };
   
   return (
      <ScrollView contentContainerStyle={styles.container}>
         {notes.map((item, index) => (
            <TouchableOpacity key={index} style={(index + 1) % 5 == 3 ? styles.squareBig : styles.square} onPress={() => pressNote(item)}>
                  <Note title={item.title} date={item.date} color={item.color} />
            </TouchableOpacity>
         ))}
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
});

export default Home;
