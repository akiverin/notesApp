import React, { useReducer } from 'react';
import notesReducer from '../notesReducer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NoteScreen from '../screens/NoteScreen'; 
import HomeScreen from '../screens/HomeScreen';
import NewNoteScreen from '../screens/NewNoteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditNoteScreen from '../screens/EditNoteScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const startNotes = [
  { id: '1', title: 'Покупка авиабилетов', date: '2023-10-11T20:27:16+03:00', color: '#d5b9fe', text: 'Планирование поездки и поиск оптимальных билетов' },
  { id: '2', title: 'Презентация проекта', date: '2022-12-11T20:27:16+03:00', color: '#edcaaa', text: 'Подготовка материалов и сценария презентации' },
  { id: '3', title: 'Тренировка и здоровое питание', date: '2023-12-10T20:27:16+03:00', color: '#cadffd', text: 'План тренировок и рацион питания на неделю' },
  { id: '4', title: 'Подготовка к собеседованию', date: '2021-11-11T20:27:16+03:00', color: '#ffafad', text: 'Изучение информации о компании и подготовка ответов на вопросы' },
  { id: '5', title: 'Обновление профессиональных навыков', date: '2023-12-11T20:27:16+03:00', color: '#62ad9e', text: 'Выбор новых курсов и план обучения на год' },
]

export const NotesContext = React.createContext();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <View style={styles.tabBarCustomButton}>
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  );
};
function MainTabNavigator() {
  return (
    <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'NewNote') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }} />
          <Tab.Screen name="NewNote" component={NewNoteScreen} options={{ title: 'Новая заметка' }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Настройки' }}/>
        </Tab.Navigator>
  )
}

const AppNavigation = () => {
  const [notes, dispatch] = useReducer(notesReducer, startNotes);

  const addNote = (newNote) => {
    dispatch({
      type: 'added',
      id: Number(notes[notes.length-1].id) + 1,
      title: newNote.title,
      text: newNote.text,
      color: newNote.color,
    });
  }

  const changeNote = (note) => {
    dispatch({
      type: 'changed',
      note: note,
    });
  }

  const deleteNote = (noteId) => {
    dispatch({
      type: 'deleted',
      id: noteId,
    });
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, changeNote }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={MainTabNavigator} />
          <Stack.Screen name="Note" component={NoteScreen} />
          <Stack.Screen name="Edit" component={EditNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesContext.Provider>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  tabBarCustomButton: {
    width: 60,
    height: 60,
    backgroundColor: 'tomato',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: -20,
  },
});
