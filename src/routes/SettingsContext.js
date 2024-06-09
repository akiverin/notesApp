import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = React.createContext();

const defaultSettings = { theme: "light", quote: true };

const storeSettings = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@settings", jsonValue);
  } catch (e) {
    console.error("Error saving settings:", e);
  }
};

const getSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@settings");
    return jsonValue != null ? JSON.parse(jsonValue) : defaultSettings;
  } catch (e) {
    console.error("Error reading settings:", e);
    return defaultSettings;
  }
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  const loadSettings = async () => {
    try {
      const storedSettings = await getSettings();
      if (storedSettings) {
        setSettings(storedSettings);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      setSettings(defaultSettings);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const changeSettings = (key, value) => {
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings, [key]: value };
      storeSettings(newSettings);
      return newSettings;
    });
  };

  useEffect(() => {
    storeSettings(settings);
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, changeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
