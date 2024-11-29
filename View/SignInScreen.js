import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import useAuthViewModel from '../ViewModel/AuthViewModel';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { signIn, loading, error } = useAuthViewModel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password);
      if (user) {
        navigation.replace('MainScreen');
      }
    } catch (err) {
      console.error('Error during sign in:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

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
      <Button title="Sign In" onPress={handleSignIn} disabled={loading} />

      {loading && <Text>Loading...</Text>}
      {(localError || error) && <Text style={styles.error}>{localError || error}</Text>}

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
          color="#3b5998"
        />
      </View>
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
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
});

export default SignInScreen;
