import React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const WeekPlanForm = () => {
const navigation = useNavigation();

return (
    <View style={styles.container}>
      <Text style={styles.title}>Concevoir son propre planning</Text>
      <Button title='GoBack' onPress={() => navigation.goBack()} />
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
export default WeekPlanForm;