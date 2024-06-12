import React, { useContext } from 'react';
import { Button, TextInput, StyleSheet, Text, Alert,View } from 'react-native';
import AuthContext from '../contexts/AuthContext';

const ScreenTwo = ({navigation}) => {
  const context = useContext(AuthContext);
  const user = context?.user;
  const setUser = context?.setUser;

  const handleConfirm = () => {
    // Check that the email contains an '@'
    const emailRegex = /@/;
    if (!user.email || !emailRegex.test(user.email)) {
      Alert.alert('Invalid Email', 'The email must contain an "@" symbol.');
      return;
    }

    // Check that the password contains at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!user.password || !passwordRegex.test(user.password)) {
      Alert.alert('Invalid Password', 'The password must contain at least 8 characters, one letter and one number.');
      return;
    }

    // Navigate to the next screen
    navigation.navigate('FormScreen3');
  };

  return (
    <>
      <Text style={styles.title}>Choose your connection credentials</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        blurOnSubmit
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        blurOnSubmit
        onChangeText={(text) => setUser({ ...user, password: text })}
      />
      <View style={styles.buttonContainer}>
      <Button
        title="Next screen"
        onPress={handleConfirm}
        color="#fff"
      />
      </View>
    </>
  );
};

export default ScreenTwo;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginBottom: 20,
    marginTop: 30,
  },
});