import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../routes/AppNavigation';
import ColorPicker from '../components/ColorPicker';

const NewNote = ({ navigation }) => {
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const { addNote } = useContext(NotesContext);


    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setColorPickerVisible(false);
    };

    const saveNote = () => {
        const newNote = {
            title: title,
            text: text,
            date: new Date(),
            color: selectedColor == null? '#e0e0e0' : selectedColor.color,
        };
        addNote(newNote);
        setTitle('');
        setText('');
        setSelectedColor(null);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    style={styles.backButton}
                    name="chevron-back-outline"
                    size={22}
                    color="#555"
                    onPress={() => navigation.goBack()}
                />
                <View style={{display: 'flex', flexDirection: 'row', gap: 4}}>
                    <TouchableOpacity style={{ ...styles.saveButton, backgroundColor: selectedColor !== null ? selectedColor.color : '#fff' }} onPress={() => setColorPickerVisible(true)}>
                        <Text style={{ color: '#555', fontWeight: '600', fontSize: 14, }}>Цвет</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
                        <Text style={{ color: '#555', fontWeight: '600', fontSize: 14, }}>Сохранить</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput
                style={styles.titleInput}
                placeholderTextColor={styles.placeholder.color}
                placeholder="Заголовок заметки"
                value={title}
                onChangeText={(newTitle) => { if (newTitle.length <= 40) { setTitle(newTitle) } }}
            />
            <TextInput
                style={styles.textInput}
                placeholderTextColor={styles.placeholder.color}
                placeholder="Текст заметки"
                multiline={true}
                value={text}
                onChangeText={setText}
            />
            <ColorPicker
                visible={colorPickerVisible}
                onClose={() => setColorPickerVisible(false)}
                onColorSelect={handleColorSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        borderRadius: 8,
        height: 46,
        width: 46,
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: 'rgb(255,255,255)',
        padding: 14,
        borderRadius: 8,
        height: 46,
        justifyContent: 'center',
    },
    titleInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 0,
        fontSize: 36,
        outlineWidth: 0,
        backgroundColor: 'transparent',
        outline: 'none',
        fontWeight: '400',
        marginBottom: 20,
    },
    textInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        textAlignVertical: 'top',
        borderWidth: 0,
        fontSize: 20,
        outlineWidth: 0,
    },
    placeholder: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
    colorButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default NewNote;
