import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NoteScreen from "../screens/NoteScreen";
import HomeScreen from "../screens/HomeScreen";
import NewNoteScreen from "../screens/NewNoteScreen";
import SettingsScreen from "../screens/SettingsScreen";
import EditNoteScreen from "../screens/EditNoteScreen";
import AboutScreen from "../screens/AboutScreen";
import SearchScreen from "../screens/SearchScreen.js";

import { NotesProvider } from "./NotesContext.js";
import { SettingsContext, SettingsProvider } from "./SettingsContext.js";

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
  const { settings } = useContext(SettingsContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home-variant" : "home-variant-outline";
          } else if (route.name === "NewNote") {
            iconName = focused ? "note-plus" : "note-plus-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "cog" : "cog-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={26} color={color} />
          );
        },
        tabBarIconStyle: {
          zIndex: 10,
          backgroundColor: "#eee",
        },
        labelStyle: {
          margin: 0,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          justifyContent: "center",
          bottom: 26,
          right: 70,
          left: 70,
          borderRadius: 30,
          height: 60,
          padding: 0,
          paddingBottom: 0,
          paddingVertical: 1,
          backgroundColor: settings.theme !== "dark" ? "white" : "#202020",
          borderTopWidth: 0,
          boxShadow: "none",
          elevation: 0,
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

function DrawerNavigator() {
  const { settings } = useContext(SettingsContext);
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerContentStyle: {
          backgroundColor: settings.theme !== "dark" ? "white" : "#202020",
        },
        drawerInactiveTintColor: settings.theme !== "dark" ? "#111" : "#eee",
        headerStyle: {
          backgroundColor: settings.theme !== "dark" ? "white" : "#202020",
          borderColor: "#fff",
          shadowColor: settings.theme !== "dark" ? "#aaa" : "#555",
        },
        headerTitleStyle: {
          color: settings.theme !== "dark" ? "black" : "white",
        },
        headerLeft: () => (
          <MaterialCommunityIcons
            onPress={() => navigation.toggleDrawer()}
            name="menu"
            size={26}
            color="rgb(10,132,255)"
            style={{ marginLeft: 20 }}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="HomeDrawer"
        options={({ navigation }) => ({
          title: "Заметочная",
          headerRight: () => (
            <MaterialCommunityIcons
              onPress={() => navigation.navigate("Search")}
              name="magnify"
              size={26}
              color="rgb(10,132,255)"
              style={{ marginRight: 20 }}
            />
          ),
        })}
        component={MainTabNavigator}
      />
      <Drawer.Screen
        name="Search"
        options={{ title: "Поиск заметок" }}
        component={SearchScreen}
      />
      <Drawer.Screen
        name="AboutDrawer"
        options={{ title: "О приложении" }}
        component={AllStackNavigator}
      />
    </Drawer.Navigator>
  );
}

function AppNavigation() {
  return (
    <SettingsProvider>
      <NotesProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </NotesProvider>
    </SettingsProvider>
  );
}

export default AppNavigation;
