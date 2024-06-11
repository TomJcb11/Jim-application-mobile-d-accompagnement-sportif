import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CheckBox = ({ isSelected, onSelection, label }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={onSelection}>
        <View style={{
          height: 20,
          width: 20,
          borderRadius: 10, // make it round
          borderWidth: 1, // add border
          borderColor: 'black', // border color
          backgroundColor: isSelected ? '#007BFF' : 'white', // change color to #007BFF
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
      <Text style={{ marginLeft: 8 }}>{label}</Text>
    </View>
  );
};

export default CheckBox;