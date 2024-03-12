import { StyleSheet, TextInput,Button, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';

export default function WeekPlanScreen() {
  const [showForm, setShowForm] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Week Plan</Text>
      <Text> La page destinée à la planification de la semaine</Text>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => setShowForm(true)}> 
            <Text style={styles.quote}> Pas de programme ?</Text>
            <Text style={styles.quote}> Composez le vous même dès maintenant en quelques clics</Text>
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
    marginTop:60,
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