import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NotesContext } from '../routes/AppNavigation';
import { Ionicons } from '@expo/vector-icons';

const NoteScreen = ({ navigation, route }) => {
   const { deleteNote } = useContext(NotesContext);
   const { id, title, text, date } = route.params;

   const handleEdit = () => {
      console.log('Режим редактирования')
   };

   const handleDelete = () => {
      deleteNote(id);
      navigation.goBack();
   };

   return (
      <View style={{ flex: 1, padding: 16 }}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, }}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
               <Ionicons name="chevron-back-outline" size={22} color="#555" style={{alignSelf: 'center'}}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 10}}>
               <TouchableOpacity style={styles.backButton} onPress={handleEdit}>
                  <Ionicons name="create" size={22} color="#555" style={{alignSelf: 'center'}}/>
               </TouchableOpacity>
               <TouchableOpacity style={styles.backButton} onPress={handleDelete}>
                  <Ionicons name="trash" size={22} color="#555" style={{alignSelf: 'center' }}/>
               </TouchableOpacity>
            </View>
         </View>
         <Text style={styles.title}>{title}</Text>
         <Text style={{ marginTop: 10 }}>{text}</Text>
         <Text style={{ marginTop: 20, opacity: 0.5 }}>{date}</Text>
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
   title: {
      paddingHorizontal: 10,
      borderWidth: 0,
      fontSize: 32,
      backgroundColor: 'transparent',
      fontWeight: '400',
      marginTop: 20,
      marginBottom: 20,
   }
})

export default NoteScreen;
