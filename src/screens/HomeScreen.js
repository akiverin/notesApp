import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Note from '../components/Note';

const Home = () => {
  const notes = [
    { id: '1', title: 'Заголовок заметки 1', date: '01-01-2022' },
    { id: '2', title: 'Заголовок заметки 2', date: '02-01-2022' },
    { id: '3', title: 'Заголовок заметки 3', date: '03-01-2022' },
    { id: '4', title: 'Заголовок заметки 4', date: '04-01-2022' },
    { id: '5', title: 'Заголовок заметки 5', date: '05-01-2022' },
  ];


  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={
            ({ item, index }) => {
                  return (
                    <View style={{ aspectRatio: 1, flex: 1, margin: 4, height: '100%' }}>
                      <Note title={item.title} date={item.date} isSquare={false} />
                    </View>
                  );
              }
        }
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, 
    justify: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Home;
