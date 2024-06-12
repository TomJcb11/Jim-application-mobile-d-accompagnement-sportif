import React, { useContext } from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import AuthContext from '../contexts/AuthContext';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  buttonContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  texterror: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign:'center'
    
  },
  error: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginBottom: 30
  }
});


function UserProfileScreen({ navigation }) {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);


  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <View style={styles.container}>
      
      {user ? (
        <View>
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Height: {user.bodyHeight} cm</Text>
        <Text style={styles.text}>Phone Number: {user.phoneNumber}</Text>
        <Text style={styles.text}>Birthdate: {new Date(user.userBirthDate).toLocaleDateString()}</Text>
        <Text style={styles.text}>Member since: {new Date(user.userInscriptionDate).toLocaleDateString()}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>XP: {user.userXp}</Text>
        <Text style={styles.text}>Level: {user.userLevel}</Text>
        <Text style={styles.text}>Sex: {user.userSex}</Text>
        <Text style={styles.text}>UserID: {user.userId}</Text>
        {user.healthIssue && Array.isArray(user.healthIssue) ? (
        user.healthIssue.map((issue, index) => (
          <Text key={index} style={styles.text}>Health Issue: {issue.healthIssue}</Text>
        ))
      ) : (
        <Text style={styles.text}>Health Issue: {user.healthIssue}</Text>
      )}
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={logout} color="#FFFFFF" />
        </View>
      </View>
      ) : (
        <View>
          <View style={styles.error}>
            <Text style={styles.texterror}>You are still in guest mode</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="SignIn" onPress={() => navigation.navigate('FormScreen1')} color="#FFFFFF" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={() => navigation.navigate('SignInScreen')} color="#FFFFFF" />
          </View>
        </View>
      )}
    </View>
  );
}

export default UserProfileScreen;