import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewNoteScreen from '../screens/NewNoteScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const NewNoteStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <View style={styles.tabBarCustomButton}>
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  );
};
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="NewNote" component={NewNoteScreen} />
    <HomeStack.Screen name="Settings" component={SettingsScreen} />
  </HomeStack.Navigator>
);

const NewNoteStackScreen = () => (
  <NewNoteStack.Navigator>
    <NewNoteStack.Screen name="NewNote" component={NewNoteScreen} />
    <NewNoteStack.Screen name="Settings" component={SettingsScreen} />
  </NewNoteStack.Navigator>
);

const SettingsStackScreen = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    <SettingsStack.Screen name="Home" component={HomeScreen} />
  </SettingsStack.Navigator>
);

const AppNavigation = () => {
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
