import React, { useReducer, useEffect } from "react";
import notesReducer from "../notesReducer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import NoteScreen from "../screens/NoteScreen";
import HomeScreen from "../screens/HomeScreen";
import NewNoteScreen from "../screens/NewNoteScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditNoteScreen from "../screens/EditNoteScreen";
import AboutScreen from "../screens/AboutScreen";
import AccountScreen from "../screens/AccountScreen";

import { NotesProvider } from "./NotesContext.js";

const Tab = createBottomTabNavigator();
const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="NoteStack" component={NoteScreen} />
      <Stack.Screen name="EditStack" component={EditNoteScreen} />
      <Stack.Screen name="NewNoteStack" component={NewNoteScreen} />
      <Stack.Screen name="SettingStack" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function AllStackNavigator() {
  return (
    <NativeStack.Navigator screenOptions={{ headerShown: false }}>
      <NativeStack.Screen name="AboutNativeStack" component={AboutScreen} />
      <NativeStack.Screen name="HomeNativeStack" component={HomeScreen} />
      <NativeStack.Screen name="NewNoteNativeStack" component={NewNoteScreen} />
      <NativeStack.Screen
        name="SettingNativeStack"
        component={SettingsScreen}
      />
    </NativeStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "NewNote") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarIconStyle: {
          // position: "absolute",
          zIndex: 10,
          // marginTop: 4,
        },
        labelStyle: {
          margin: 0,
          // marginTop: 2,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          justifyContent: "center",
          bottom: 26,
          right: 30,
          left: 30,
          borderRadius: 30,
          height: 60,
          padding: 0,
          paddingBottom: 0,
          paddingVertical: 1,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{ title: "Главная" }}
      />
      <Tab.Screen
        name="NewNote"
        component={NewNoteScreen}
        options={{ title: "Новая заметка" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Настройки" }}
      />
    </Tab.Navigator>
  );
}

const AppNavigation = () => {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="HomeDrawer"
            options={({ navigation }) => ({
              title: "Мои заметки",
              headerRight: () => (
                <Ionicons
                  onPress={() => navigation.navigate("Account")}
                  name="person-circle-outline"
                  size={28}
                  color="rgb(10,132,255)"
                  style={{ marginRight: 20 }}
                />
              ),
            })}
            component={MainTabNavigator}
          />
          <Drawer.Screen
            name="Account"
            options={{ title: "Мой профиль" }}
            component={AccountScreen}
          />
          <Drawer.Screen
            name="AboutDrawer"
            options={{ title: "О приложении" }}
            component={AllStackNavigator}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
};

export default AppNavigation;
