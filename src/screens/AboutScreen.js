import React from 'react';
import { View, Text, Button } from 'react-native'; 
const AboutScreen = ({ navigation }) => {
return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Это экран о проекте</Text>
    <Button title="Вернуться назад" onPress={() => navigation.goBack()} /> 
</View>
); 
};
export default AboutScreen;