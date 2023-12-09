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
    <HomeStack.Screen name="Главная" component={HomeScreen} />
    <HomeStack.Screen name="Создать" component={NewNoteScreen} />
    <HomeStack.Screen name="Настройки" component={SettingsScreen} /> 
  </HomeStack.Navigator>
);

const NewNoteStackScreen = () => (
  <NewNoteStack.Navigator>
    <NewNoteStack.Screen name="Создать" component={NewNoteScreen} /> 
    <NewNoteStack.Screen name="Настройки" component={SettingsScreen} />
  </NewNoteStack.Navigator> 
);

const SettingsStackScreen = () => ( 
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Настройки" component={SettingsScreen} />
    <SettingsStack.Screen name="Главная" component={HomeScreen} /> 
  </SettingsStack.Navigator>
);

  const AppNavigation = () => {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Главная') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Создать') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Настройки') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Создать" component={NewNoteScreen} 
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Ionicons name="add" size={24} color="white" />
            </CustomTabBarButton>
          ),
        }}
        />
        <Tab.Screen name="Настройки" component={SettingsScreen} /> 
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