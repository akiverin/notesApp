import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Note from '../components/Note';
import { NotesContext } from '../routes/AppNavigation';

const Home = () => {
   const { notes } = useContext(NotesContext);
   return (
      <ScrollView contentContainerStyle={styles.container}>
         {notes.map((item, index) => (
            <View key={index} style={(index + 1) % 5 == 3 ? styles.squareBig : styles.square}>
               <Note title={item.title} date={item.date} isSquare={false} />
            </View>
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
