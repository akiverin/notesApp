import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const colors = [
  { name: "Perfume", color: "#d5b9fe" },
  { name: "Cornflower", color: "#ffafad" },
  { name: "Pancho", color: "#edcaaa" },
  { name: "Turquoise", color: "#25eae6" },
  { name: "Tropical Blue", color: "#cadffd" },
  { name: "Onahau", color: "#c6f2f9" },
  { name: "Solomie", color: "#ffdd85" },
  { name: "Keppel", color: "#62ad9e" },
  { name: "Tangerine", color: "#ff9377" }
];

const ColorPicker = ({ visible, onClose, onColorSelect }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.colorGrid}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorSquare, { backgroundColor: color.color }]}
              onPress={() => onColorSelect(color)}
            >
              <Text style={styles.colorName}>{color.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  colorSquare: {
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorName: {
    color: '#555', 
    fontWeight: '600', 
    fontSize: 14
  }
});

export default ColorPicker;
