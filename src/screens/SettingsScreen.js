import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';
import { View, Text, Platform, Appearance } from 'react-native';
import IconButton from '../components/UI/IconButton';

const SettingsScreen = ({ navigation }) => {

  const themeDetector = useRef();

  useImperativeHandle(themeDetector, () => ({
    getTheme() {
      if (Platform.OS === 'web') {
        return Appearance.getColorScheme();
      } else {
        if (Platform.OS === 'android') {
            return Appearance.getColorScheme() || (Platform.OS === 'android' && Platform.OS === 'dark') ? 'dark' : 'light';
        } else {
          return Appearance.getColorScheme() || 'light';
        }
      }
    }
  }));

  useEffect(() => {
    setCurrentTheme(themeDetector.current.getTheme());
  }, [themeDetector.current]);

  const [currentTheme, setCurrentTheme] = useState(null);

  useEffect(() => {
    setCurrentTheme(themeDetector.current.getTheme());
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme === 'dark' ? '#222' : '#fff' }}>
      <Text style={{color: currentTheme === 'dark' ? '#fff' : '#000'}}>Это экран настроек</Text>
      <Text style={{marginBottom: 10, color: currentTheme === 'dark' ? '#fff' : '#000'}}>Выбрана тема: {currentTheme}</Text>
      <IconButton icon="chevron-back-outline" title="Вернуться назад" onPress={() => navigation.goBack()}/>
    </View>
  );
};

export default SettingsScreen;
