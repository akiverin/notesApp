import React, { useReducer, useEffect } from 'react';
import notesReducer from '../notesReducer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NoteScreen from '../screens/NoteScreen'; 
import HomeScreen from '../screens/HomeScreen';
import NewNoteScreen from '../screens/NewNoteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const startNotes = [
  { id: '1', title: 'Покупка авиабилетов', date: '2023-10-11T20:27:16+03:00', color: '#d5b9fe', text: 'Планирование поездки и поиск оптимальных билетов' },
  { id: '2', title: 'Презентация проекта', date: '2022-12-11T20:27:16+03:00', color: '#edcaaa', text: 'Подготовка материалов и сценария презентации' },
  { id: '3', title: 'Тренировка и здоровое питание', date: '2023-12-10T20:27:16+03:00', color: '#cadffd', text: 'План тренировок и рацион питания на неделю' },
  { id: '4', title: 'Подготовка к собеседованию', date: '2021-11-11T20:27:16+03:00', color: '#ffafad', text: 'Изучение информации о компании и подготовка ответов на вопросы' },
  { id: '5', title: 'Обновление профессиональных навыков', date: '2023-12-11T20:27:16+03:00', color: '#62ad9e', text: 'Выбор новых курсов и план обучения на год' },
]

export const NotesContext = React.createContext();

function MainStackNavigator(){
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="NoteStack" component={NoteScreen} />
      <Stack.Screen name="EditStack" component={EditNoteScreen} />
      <Stack.Screen name="NewNoteStack" component={NewNoteScreen} />
      <Stack.Screen name="SettingStack" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

function AllStackNavigator(){
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="AboutNativeStack" component={AboutScreen} />
      <NativeStack.Screen name="HomeNativeStack" component={HomeScreen} />
      <NativeStack.Screen name="NewNoteNativeStack" component={NewNoteScreen} />
      <NativeStack.Screen name="SettingNativeStack" component={SettingsScreen} />
    </NativeStack.Navigator>
  )
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
      <Tab.Screen name="Home" component={MainStackNavigator} options={{ title: 'Главная' }} />
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
        <Drawer.Navigator>
          <Drawer.Screen 
            name="HomeDrawer" 
            options={{title: 'Мои заметки'}}
            component={MainTabNavigator} 
          />
          <Drawer.Screen 
            name="AboutDrawer"
            options={{title: 'О приложении'}}
            component={AllStackNavigator}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NotesContext.Provider>
  );
};

export default AppNavigation;