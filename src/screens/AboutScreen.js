import React from 'react';
import { View, Text } from 'react-native'; 
import IconButton from '../components/UI/IconButton';
const AboutScreen = ({ navigation }) => {
return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20, padding: 20 }}>
        <Text style={{fontSize: 22, fontWeight: '400'}}>О проекте</Text>
        <Text style={{textAlign: 'center', marginBottom: 10,}}>Проект "Заметки: Приложение для создания и управления заметками пользователя" выполнен Кивериным Андреем. </Text>
        <IconButton icon="chevron-back-outline" title="Вернуться назад" onPress={() => navigation.goBack()}/>
    </View>
); 
};
export default AboutScreen;