import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ icon, title, onPress, style }) => {
  let buttonColor = style?(style.color?style.color:'#555555'):'#555555';
  return (
    <TouchableOpacity 
      style={[
        style, 
        styles.theButton, 
        {width: (title?'auto':46)}, 
        style?null:{backgroundColor: 'rgb(255,255,255)'}
      ]} 
      onPress={onPress}
      activeOpacity="0.6">
        {icon && <Ionicons name={icon} size={22} color="#555" style={{ alignSelf: 'center' }} />}
        {title && <Text style={[styles.theText,{ color: buttonColor }]}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  theButton: {
    flexDirection: 'row',
    gap: 10, //расстояние между иконкой и тектом
    alignItems: 'center', //выравнивание контента по центру горизонтали
    padding: 10, //поле от границ кнопки
    borderRadius: 8, //скругленность кнопки
    height: 46,
    width: 46,
    justifyContent: 'center', //выравнивание контента по центру
    boxShadow: '0px 2px 10px 0px #00000008, 0px -7px 17px -4px #00000010 inset', //тени для кнопки для разных ОС
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  theText: {
    fontWeight: '600', 
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.06)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default IconButton;

