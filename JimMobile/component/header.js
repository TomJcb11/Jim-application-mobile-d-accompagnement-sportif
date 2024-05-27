import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserProfile } from '../screens/UserProfileScreen'

export default function Header() {
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Jim</Text>
        <Button title="User Profile" onPress={() => navigation.navigate('UserProfile')} />
      </View>
    );
  }
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 35,
      borderBottomWidth: 2,
      borderBottomColor: 'black',
      backgroundColor: 'lightblue',
    },
    logo: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    Button: {
      fontSize: 16,
      color: 'blue',
    },
  });