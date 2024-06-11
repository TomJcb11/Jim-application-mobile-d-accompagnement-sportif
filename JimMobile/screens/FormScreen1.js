import React, { useContext, useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';
import UserContext from '../contexts/UserContext';
import { Picker } from '@react-native-picker/picker';

const ScreenOne = ({navigation}) => {
  const context = useContext(UserContext);
  const [user, setUser] = useState({});
  const [sex, setSex] = useState('Other');

  const [day, setDay] = useState('1');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const handleConfirm = () => {
    const date = new Date(year, month - 1, day);
    const isoDate = date.toISOString();
  
    // Check that the birthdate is older than the current date
    if (date >= new Date()) {
      alert('The birthdate must be older than the current date.');
      return;
    }
  
    // Check that the full name is not null
    if (!user.name) {
      alert('The full name cannot be empty.');
      return;
    }
  
    // Check that the phone number is not null and only contains digits
    const phoneRegex = /^[0-9]+$/;
    if (!user.phoneNumber || !phoneRegex.test(user.phoneNumber)) {
      alert('The phone number cannot be empty and must only contain digits.');
      return;
    }
  
    // Convert the sex selection to 'M', 'F', or 'O'
    const sexCode = sex === 'Male' ? 'M' : sex === 'Female' ? 'F' : 'O';
  
    // Save the user information in the context
    context.setUser({ 
      ...user, 
      birthDate: isoDate, 
      name: user.name, 
      phoneNumber: user.phoneNumber,
      userSex: sexCode
    });
  
    // Navigate to the next screen
    navigation.navigate('FormScreen2');
  };

  return (
    <View>
      <Text style={styles.h1}>Please enter the following informations.</Text>
      <Text> Enter your BirthDate, Fullname,Phonenumber and Sex </Text>


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
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        blurOnSubmit
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="PhoneNumber"
        blurOnSubmit
        onChangeText={(text) => setUser({ ...user, phoneNumber: text })
      }
      />
       <Picker
          selectedValue={sex}
          onValueChange={(itemValue) => setSex(itemValue)}
          style={styles.fullWidthPicker}
        >
          <Picker.Item label="Other" value="Other" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />     
        </Picker>


      <View style={styles.buttonContainer}>
      <Button
        title="Next screen"
        onPress={handleConfirm}
        color="#fff"
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  buttonContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 180,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fullWidthPicker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    padding: 20
  },
  
});

export default ScreenOne;