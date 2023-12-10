import React from 'react';
import { View, Text } from 'react-native';

const Note = ({ title, date, isSquare }) => {
  const getRandomColor = () => {
    const colors = ['#FFD1DC', '#FFB7B2', '#FFDAC1', '#B5EAD7', '#C7CEEA', '#FFDAC1', '#E2E2E2', '#FFDDC1', '#C2C0B7', '#D0ECEA', '#B7B0A5', '#B69E35', '#B9A281', '#BE9A8B', '#B2E08F', '#D1E6D0', '#D5E0A3', '#F3EAC1', '#FFC300', '#FF9999'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const noteStyle = {
    backgroundColor: getRandomColor(),
    padding: 16,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  };

  return (
    <View style={noteStyle}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ fontSize: 12, fontStyle: 'italic', position: 'absolute', bottom: 8, right: 8 }}>{date}</Text>
    </View>
  );
};

export default Note;
