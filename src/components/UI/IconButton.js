import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ icon, title, onPress, style }) => {
  return (
    <TouchableOpacity style={[style, styles.theButton, {width: (title?'auto':46)}, style?null:{backgroundColor: 'rgb(255,255,255)'}]} onPress={onPress}>
        {icon && <Ionicons name={icon} size={22} color="#555" style={{ alignSelf: 'center' }} />}
        {title && <Text style={{ color: '#555', fontWeight: '600', fontSize: 14 }}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  theButton: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    height: 46,
    width: 46,
    justifyContent: 'center',
  },
});

export default IconButton;

