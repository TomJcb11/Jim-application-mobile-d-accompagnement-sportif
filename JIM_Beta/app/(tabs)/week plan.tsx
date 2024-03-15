import { StyleSheet, TextInput,Button, TouchableOpacity, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';



export default function WeekPlanScreen() {
  const [showForm, setShowForm] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Week Plan</Text>
      <Text> La page destinée à la planification de la semaine</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('week plan form')}>
          <Text style={styles.quote}>Créer un programme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.quote}>Rentre chez ta mère</Text>
        </TouchableOpacity>        
      </View> 
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
  button:{
    margin:15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20, 
  },
  quote:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  }
});