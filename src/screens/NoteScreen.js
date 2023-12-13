import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NotesContext } from '../routes/AppNavigation';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const NoteScreen = ({ navigation, route }) => {
   const { deleteNote } = useContext(NotesContext);
   const { id, title, text, date, color } = route.params;

   const handleEdit = () => {
      navigation.navigate('Edit', {
         id: id,
         title: title,
         text: text,
         color: color,
         date: moment(date).locale('ru').format('D MMM YYYY'),
      });
   };

   const handleDelete = (noteId) => {
      deleteNote(noteId);
   };

   return (
      <View style={{ flex: 1, padding: 16 }}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, }}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
               <Ionicons name="chevron-back-outline" size={22} color="#555" style={{alignSelf: 'center'}}/>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 10}}>
               <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                  <Ionicons name="create" size={22} color="#555" style={{alignSelf: 'center'}}/>
               </TouchableOpacity>
               <TouchableOpacity style={styles.iconButton} onPress={()=>{handleDelete(id); navigation.goBack();}}>
                  <Ionicons name="trash" size={22} color="#555" style={{alignSelf: 'center' }}/>
               </TouchableOpacity>
            </View>
         </View>
            <Text style={styles.title}>{title}</Text>
         <ScrollView>
            <Text style={styles.text}>{text}</Text>
         </ScrollView>
            <Text style={styles.date}>{moment(date).locale('ru').format('D MMM YYYY')}</Text>
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
   iconButton: {
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
   },
   text: {
      marginTop: 10, 
      paddingHorizontal: 10, 
      lineHeight: '150%', 
      fontSize: 18,
   },
   date: {
      marginVertical: 20, 
      opacity: 0.5, 
      paddingHorizontal: 10,
      textAlign: 'end',
   }
})

export default NoteScreen;
