import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, View,Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createAccount } from '../store';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const handleCreateAccount = () => {
    if (email.trim() === '' || password.trim() === '' || fullname.trim() === '' || confirmPassword.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    // Gọi hàm createAccount với email, password và fullname
    createAccount(email, password, fullname);
  };

  return (
    <ImageBackground
      source={require('../assets/bgg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <TextInput
          label="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <TextInput
          label="Họ và tên"
          value={fullname}
          onChangeText={setFullname}
          style={styles.input}
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
          Đăng ký
        </Button>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <Text>Alreadly got an account?</Text>
          <Button onPress={()=>navigation.navigate("Login")}>Log in</Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#af79d1',
    borderRadius: 20,
    elevation: 2,
  },
});

export default Register;