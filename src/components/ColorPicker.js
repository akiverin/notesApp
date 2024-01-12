import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const colors = [
  { name: "Perfume", color: "#d5b9fe" },
  { name: "Cornflower", color: "#ffafad" },
  { name: "Pancho", color: "#edcaaa" },
  { name: "Turquoise", color: "#25eae6" },
  { name: "Party Bliss", color: "linear-gradient(to top, #4481eb 0%, #04befe 100%)" },
  { name: "Onahau", color: "#c6f2f9" },
  { name: "Solomie", color: "#ffdd85" },
  { name: "Crystalline", color: "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)" },
  { name: "Tangerine", color: "#ff9377" },
  { name: "Night Fade", color: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)"},
  { name: "Dusty Grass", color: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)" },
  { name: "Winter Neva", color: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" },
  { name: "Cloudy Apple", color: "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)" },
  { name: "Shy Rainbow", color: "linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%)" },
  { name: "Child Care", color: "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)" },
  { name: "Gagarin View", color: "linear-gradient(134deg, rgb(141 255 228) 0%, rgb(223 155 255) 48%, rgb(159 146 255) 100%)" },
  { name: "Clever", color: "linear-gradient(rgb(188 147 255), rgb(218 195 255 / 1%) 80%), linear-gradient(263deg, rgb(162 186 255) 25%, rgb(255 170 84) 75%)" },
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
              style={[styles.colorSquare, { background: color.color }]}
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
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 90,
  }
});

export default ColorPicker;
