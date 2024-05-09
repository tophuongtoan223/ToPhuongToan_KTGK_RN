import React, { useState } from "react";
import { View, ImageBackground } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import {Login, useMyContextProvider} from "../store"
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sử dụng useMyContextProvider thay vì useMyContextController
  const [controller, dispatch] = useMyContextProvider();

  const onSubmit = () => {
    // Sử dụng dispatch từ context
    Login(dispatch, email, password);
  };

  return (
    <ImageBackground
      source={require('../assets/logofb.png')}
      style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
    >
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', alignSelf: 'center', marginBottom: 30, color: 'white' }}>
          Login
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            margin: 10,
            backgroundColor: 'white',
            color: 'black'
          }}
          mode="outlined"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{
            margin: 10,
            backgroundColor: 'white',
            color: 'black'
          }}
          right={<TextInput.Icon icon="eye" onPress={() => setShowPassword(!showPassword)} />}
          mode="outlined"
        />
        <Button
          mode="contained-tonal"
          onPress={onSubmit}
          style={{
            margin: 10,
            padding: 5
          }}
          labelStyle={{
            fontSize: 20
          }}
        >
          Đăng nhập
        </Button>
      </View>
    </ImageBackground>
  );
};

export default Login;
