import React, { useContext, useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,TextInput,Button,Alert } from 'react-native';
import UserContext from '../contexts/UserContext';
import { Picker } from '@react-native-picker/picker';

const healthIssues = ['None', 'Heart', 'Back', 'Left leg', 'Right leg', 'Left arm', 'Right arm'];

const CheckBox = ({isSelected, onSelection}) => {
  return (
    <TouchableOpacity onPress={onSelection}>
      <View style={{
        height: 20,
        width: 20,
        padding:10,
        borderRadius: 10, // make it round
        borderWidth: 1, // add border
        borderColor: 'black', // border color
        backgroundColor: isSelected ? '#007BFF' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {isSelected && <View style={{
          height: 10,
          width: 10,
          borderRadius: 5, // make it round
          backgroundColor: 'white', // inner circle color
        }} />}
      </View>
    </TouchableOpacity>
  );
};

const FormScreen3 = ({navigation}) => {
  const context = useContext(UserContext);
  const user = context?.user;
  const setUser = context?.setUser;

  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const [weight, setWeight] = useState('50');
  const [height, setHeight] = useState('150');

  const [selectedIssues, setSelectedIssues] = useState([]);


  const handleIssue = (issue) => {
    if (issue === 'none') {
      setSelectedIssues(['none']);
    } else if (selectedIssues.includes('none')) {
      setSelectedIssues([issue]);
    } else if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter(i => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };


  
  const handleSubmit = () => {
    if (!weight || weight < 30 || weight > 300) {
      Alert.alert('Error', 'Please enter a valid weight between 30 and 300 kg');
      return;
    }
    if (!height || height < 50 || height > 250) {
      Alert.alert('Error', 'Please enter a valid height between 50 and 250 cm');
      return;
    }
  
    // Créez une copie de userBody et healthIssue si elles existent, sinon initialisez-les comme des tableaux vides
    let userBodyCopy = user.userBody ? [...user.userBody] : [];
    let healthIssueCopy = [];
  
    // Ajoutez les nouvelles valeurs à userBody
    userBodyCopy.push({
      bodyWeight: weight,
      measuringDate: new Date(year, month - 1, day).toISOString()
    });
  
    // Ajoutez les nouvelles valeurs à healthIssue
    selectedIssues.forEach(issue => {
      healthIssueCopy.push({
        healthIssue: issue
      });
    });
  
    // Mettez à jour le contexte
    setUser({
      ...user,
      bodyHeight: height,
      userBody: userBodyCopy,
      healthIssue: healthIssueCopy
    });
    // Naviguez vers 'SignUpScreen'
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Last Weighing Date</Text>
    <View style={styles.datePickerContainer}>
      <Picker
        selectedValue={day}
        onValueChange={(itemValue) => setDay(itemValue)}
        style={styles.datePicker}
      >
        {/* Generate days */}
        {[...Array(31)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
        ))}
      </Picker>
      <Picker
        selectedValue={month}
        onValueChange={(itemValue) => setMonth(itemValue)}
        style={styles.datePicker}
      >
        {/* Generate months */}
        {[...Array(12)].map((_, i) => (
          <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
        ))}
      </Picker>
      <Picker
        selectedValue={year}
        onValueChange={(itemValue) => setYear(itemValue)}
        style={styles.datePicker}
      >
        {/* Generate years */}
        {[...Array(101)].map((_, i) => (
          <Picker.Item key={i} label={`${new Date().getFullYear() - i}`} value={`${new Date().getFullYear() - i}`} />
        ))}
      </Picker>
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View>
    <Text style={styles.title}>Height (cm) </Text>
    <TextInput
      style={styles.input}
      onChangeText={setHeight} // Assurez-vous d'utiliser la bonne fonction pour définir la hauteur
      value={height} // Assurez-vous d'utiliser la bonne variable pour la hauteur
      placeholder="Enter your height"
      keyboardType="numeric"
    />
  </View>
  <View>
    <Text style={styles.title}>Weight (Kg) </Text>
    <TextInput
      style={styles.input}
      onChangeText={setWeight}
      value={weight}
      placeholder="Enter your last weight"
      keyboardType="numeric"
    />
  </View>
</View>
    <Text style={styles.title}>Health Issues ? </Text>
    <ScrollView>
      <View style={styles.checkboxListContainer}>
        {healthIssues.map((issue, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <CheckBox
              isSelected={selectedIssues.includes(issue)}
              onSelection={() => handleIssue(issue)}
            />
            <Text style={styles.label}>{issue}</Text>
          </View>
        ))}
        <Button
              title="Submit"
              onPress={handleSubmit}
            />
      </View>
    </ScrollView>
    
    
  </View>
  );
};

export default FormScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxListContainer: {
    height:40
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  label: {
    margin: 8,
    fontSize:18,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  datePicker: {
    width: 140,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    width: 160
  },
});