import React, { useContext } from 'react';
import { View, Text,FlatList,TouchableOpacity } from 'react-native';
import UserContext from '../contexts/UserContext'; 
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../query/createUser';



const SignUpScreen = () => {
  const { user } = useContext(UserContext);
  const [createUser, { data }] = useMutation(CREATE_USER);

  const handleCreateUser = async () => {
    try {
      await createUser({ 
        variables: { 
          user: {
            name: user.name, 
            email: user.email, 
            password: user.password,
            bodyHeight: user.bodyHeight,
            phoneNumber: user.phoneNumber,
            userBirthDate: user.userBirthDate,
            userInscriptionDate: user.userInscriptionDate,
            userSex: user.userSex,
            userXp: user.userXp,
            userLevel: user.userLevel,
            healthIssue: user.healthIssue,
            userBody: user.userBody
          } 
        } 
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

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