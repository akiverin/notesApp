import React from 'react';
import { View, Text, Button } from 'react-native'; 
const NewNoteScreen = ({ navigation }) => {
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Это экран новой задачи</Text>
    <Button title="Вернуться назад" onPress={() => navigation.goBack()} /> 
</View>
); 
};
export default NewNoteScreen;