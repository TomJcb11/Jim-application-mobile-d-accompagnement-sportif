import React, { useContext } from 'react';
import { Text, View,Button } from 'react-native';
import AuthContext from '../contexts/AuthContext';

function UserProfileScreen({ navigation }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <View>
      {isAuthenticated ? (
        <Text>Vous êtes connecté</Text>
      ) : (
        <View>
          <Text>Vous n'êtes pas connecté</Text>
          <Button
            title="Inscription"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
          <Button
            title="Connexion"
            onPress={() => navigation.navigate('SignInScreen')}
          />
        </View>
      )}
    </View>
  );
}

export default UserProfileScreen;