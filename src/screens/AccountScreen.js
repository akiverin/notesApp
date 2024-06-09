import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";

const AccountScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Вход");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Логин"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <IconButton
        style={{
          backgroundColor: "rgb(10,132,255)",
          color: "#FFF",
          marginTop: 10,
        }}
        title="Войти"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 46,
    borderColor: "#EBEBEB",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    backgroundColor: "#FAFAFA",
  },
});

export default AccountScreen;
