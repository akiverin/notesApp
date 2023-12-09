import React from 'react';
import { View, Text, Button } from 'react-native'; 
const HomeScreen = ({ navigation }) => {
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Это домашний экран</Text>
    <Button title="Перейти к созданию новой задачи" onPress={() => navigation.navigate('Создать')} />
</View> 
);
};
export default HomeScreen;