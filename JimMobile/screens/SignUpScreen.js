import React, { useContext } from 'react';
import { View, Text,FlatList,TouchableOpacity, Alert } from 'react-native';
import AuthContext from '../contexts/AuthContext'; 
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../query/createUser';



const SignUpScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const [createUser, { data }] = useMutation(CREATE_USER);

  const handleCreateUser = async () => {
    try {
      const response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateUser($user: UserInput!) {
              createUser(user: $user) {
                email
                password
                name
                bodyHeight
                phoneNumber
                userBirthDate
                userInscriptionDate
                userSex
                userXp
                userLevel
                healthIssue {
                  id
                  healthIssue
                }
                userBody {
                  bodyWeight
                  id
                  measuringDate
                  userId
                }
              }
            }
          `,
          variables: {
            user: {
              name: user.name,
              email: user.email,
              password: user.password,
              phoneNumber: user.phoneNumber,
              userSex: user.userSex,
              bodyHeight: parseFloat(user.bodyHeight),
              userBirthDate: user.birthDate, 
              userXp: user.userXp,
              userLevel: user.userLevel,
              userBody: user.userBody.map(body => ({
                bodyWeight: parseFloat(body.bodyWeight),
                measuringDate: body.measuringDate
              })),
              healthIssue: user.healthIssue.map(issue => ({
                healthIssue: issue.healthIssue.split(' ').map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')
              })),
            }
          },
        }),
      });
      
      const api_response = await response.json();
      console.log(api_response)
      if (api_response.data && api_response.data.createUser) {
        console.log("User created successfully");
        Alert.alert("User created successfully")
      } else {
        console.error("Error creating user:", api_response.errors);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <View style={styles.container}>
       <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCreateUser}>
            <Text style={styles.buttonText}>Create my account with this</Text>
          </TouchableOpacity>
        </View>
      <Text style={styles.title}> Personnal Informations</Text>
      <Text style={styles.item}>Name: {user.name}</Text>
      <Text style={styles.item}>User Sex: {user.userSex}</Text>
      <Text style={styles.item}>Email: {user.email}</Text>
      <Text style={styles.item}>Password: {user.password}</Text>
      <Text style={styles.item}>Phone Number: {user.phoneNumber}</Text>
      <Text style={styles.item}>User Birth Date: {new Date(user.birthDate).toLocaleDateString()}</Text>
      
      <Text style={styles.title}> Physical Aspects</Text>
      <Text style={styles.item}>Body Height: {user.bodyHeight} cm </Text>
      
  
      <Text style={styles.item}>User Body:</Text>
      <FlatList
        data={user.userBody}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Weight: {item.bodyWeight} Kg</Text>
            <Text>Date: {new Date(item.measuringDate).toLocaleDateString()}</Text>
          </View>
        )}
      />
  
      <Text style={styles.title}>Health Issue:</Text>
      <FlatList
        data={user.healthIssue}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{'\u2022 ' + item.healthIssue}</Text>}
      />
    </View>
  );

  
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 30,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignUpScreen;
