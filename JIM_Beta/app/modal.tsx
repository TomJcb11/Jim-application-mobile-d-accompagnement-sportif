import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet } from 'react-native';


import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useNavigation } from 'expo-router';







export default function ModalScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil utilisateur</Text>
      <Button title='GoBack' onPress={() => navigation.goBack()} />
      //TO DO : formulaire d'inscirption et placeholder
      <Text></Text>
      <Button title='GoBack' onPress={() => navigation.goBack()} />
      

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
