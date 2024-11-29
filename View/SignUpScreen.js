import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import useAuthViewModel from '../ViewModel/AuthViewModel';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { signUp, loading, error } = useAuthViewModel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password);
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          })
        ); // Cleanning the navigation stack and going to MainScreen
      }
    } catch (err) {
      console.error('Error during sign up:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default SignUpScreen;
