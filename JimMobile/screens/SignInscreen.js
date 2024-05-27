import React, { useState } from 'react';
import { API_URL } from '@env'
import { View, TextInput, Button, Alert } from 'react-native';

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              login(email: "${email}", password: "${password}") {
                token
                user {
                  userId
                  name
                }
              }
            }
          `,
        }),
      });
      
      const data = await response.json();
      
      console.log('Response:', data);
      
      if (data.data && data.data.login) {
        setIsAuthenticated(true);
        Alert.alert('Connexion réussie');
      } else if (data.errors && data.errors.length > 0) {
        Alert.alert('Erreur', data.errors[0].message);
      } else {
        Alert.alert('Erreur', 'Une erreur inconnue est survenue');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email : johndoe@example.com"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password : ***********"
        secureTextEntry
      />
      <Button title="Se Connecter" onPress={handleSignIn} />
    </View>
  );
}

export default SignInScreen;