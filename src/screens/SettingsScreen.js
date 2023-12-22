import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';
import { View, Text, Button, Platform, Appearance } from 'react-native';

const SettingsScreen = ({ navigation }) => {

  const themeDetector = useRef();

  useImperativeHandle(themeDetector, () => ({
    getTheme() {
      if (Platform.OS === 'web') {
        return Appearance.getColorScheme();
      } else {
        if (Platform.OS === 'android') {
          return Appearance.getColorScheme() || Platform.OS === 'dark' ? 'dark' : 'light';
        } else {
          return Appearance.getColorScheme() || 'light';
        }
      }
    }
  }));

  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    setCurrentTheme(themeDetector.current.getTheme());
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Это экран настроек</Text>
      <Text>Выбрана тема: {currentTheme}</Text>
      <Button title="Вернуться назад" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SettingsScreen;
