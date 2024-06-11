import React, { useState,useContext } from 'react';
import { API_URL } from '@env'
import { StyleSheet,View, TextInput, Button, Alert } from 'react-native';
import AuthContext from '../contexts/AuthContext'

function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      const response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user {
                name
                bodyHeight
                phoneNumber
                userBirthDate
                userInscriptionDate
                email
                userXp
                userLevel
                userSex
                userWeekPlans {
                  workoutSessions {
                    sessionData
                  }
                }
                healthIssue {
                  healthIssue
                }
                userBody {
                  bodyWeight
                  measuringDate
                }
                userId
              }
            }
          }
          `,
          variables: {
            email: email,
            password: password,
          },
        }),
      });
  
      const api_response = await response.json();
    

      if (api_response.data && api_response.data.login && api_response.data.login.user) {
        setIsAuthenticated(true);
        setUser(api_response.data.login.user);
        Alert.alert('Success', 'you are now logged in, enjoy your next training !');
      } else if (api_response.errors) {
        throw new Error(api_response.errors[0].message);
      } else {
        throw new Error('Unknown Error');
}
    } catch(error) {
      Alert.alert('Error', 'Error during user information retrieval');
      
    }
  };



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#F5F5F5',
    },
    input: {
      height: 40,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
      borderRadius: 5,
    },
    buttonContainer: {
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
  });


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email : johndoe@example.com"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password : ***********"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Se Connecter" onPress={handleSignIn} color="#FFFFFF" />
      </View>
    </View>
  );
  
  
}

export default SignInScreen;