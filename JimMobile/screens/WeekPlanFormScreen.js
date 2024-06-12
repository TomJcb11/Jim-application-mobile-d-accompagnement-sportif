import React, { useState,useContext } from 'react';
import { View, Text, Button, ScrollView, TextInput,StyleSheet, ActivityIndicator,Alert } from 'react-native';
import { RoundedCheckbox } from "react-native-rounded-checkbox";
import { sharedStyles } from '../shared/style';

import { useMutation, gql } from '@apollo/client';

import WeekPlanContext from '../contexts/weekPlanContext';
import AuthContext from '../contexts/AuthContext';

export default function WeekPlanFormScreen() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [formData, setFormData] = useState({
    daysOfTheWeek: [],
    objectives: [],
    Infrastructure: ['Yes'],
    level: [],
    targetedMuscles: {
        legs: [],
        upperBody: [],
        back: [],
        arm: [],
      },
});

const CREATE_WEEK_PLAN = gql`
    mutation Mutation($weekPlan: WeekPlanInput!) {
        createWeekPlan(weekPlan: $weekPlan) {
            dataProviding
            programUserId
            programOwnerId
        }
    }
`;
const { user } = useContext(AuthContext);
const { setUserProviding } = useContext(WeekPlanContext);
const [isLoading, setIsLoading] = useState(false);
const [createWeekPlan, { data }] = useMutation(CREATE_WEEK_PLAN);


const handleSubmit = async () => {
  try {
      const infrastructureAvailability = formData.Infrastructure[0] === 'Yes' ? 'gym' : 'home';
      const { data } = await createWeekPlan({ 
        variables: { 
            weekPlan: {
                dataProviding: formData,
                programOwnerId: user.userId, 
                programUserId: user.userId,
                infrastructureAvailability: infrastructureAvailability,
            }
        } 
    });
      
      setUserProviding(data.createWeekPlan);
      Alert.alert('Week plan created successfully');
  } catch (error) {
      console.log(error.message);
      alert('Error while creating the week plan: ' + error.message);
  }
}

    const userProviding = {
      daysOfTheWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      objectives: ['cardio', 'strength', 'stretching', 'strongman'],
      Infrastructure: ['home', 'outdoor','gym'],
      level: ['beginner', 'intermediate', 'expert'],
      targetedMuscles: {
        legs: ['abductors', 'adductors', 'quadriceps', 'calves', 'glutes', 'hamstrings'],
        upperBody: ['chest', 'abdominals', 'neck'],
        back: ['lats', 'traps', 'lower_back', 'middle_back'],
        arm: ['biceps', 'forearms', 'triceps']
      }
    }
    const handleSelectAllChange = (muscleGroup) => {
        setFormData((prevFormData) => {
            if (prevFormData.targetedMuscles[muscleGroup].length === userProviding.targetedMuscles[muscleGroup].length) {
                // Si tous les muscles du groupe sont déjà sélectionnés, décochez-les tous
                const newFormData = { 
                    ...prevFormData, 
                    targetedMuscles: {
                        ...prevFormData.targetedMuscles,
                        [muscleGroup]: [],
                    },
                };
                return newFormData;
            } else {
                // Sinon, cochez tous les muscles du groupe
                const newFormData = { 
                    ...prevFormData, 
                    targetedMuscles: {
                        ...prevFormData.targetedMuscles,
                        [muscleGroup]: userProviding.targetedMuscles[muscleGroup],
                    },
                };
                return newFormData;
            }
        });
    };
    
    const handleCheckboxChange = (item, category, muscleGroup) => {
      setFormData((prevFormData) => {
        if (category === 'targetedMuscles') {
          if (prevFormData[category] && prevFormData[category][muscleGroup] && prevFormData[category][muscleGroup].includes(item)) {
            // Si l'élément est déjà sélectionné, supprimez-le de la liste
            const newFormData = { 
              ...prevFormData, 
              [category]: {
                ...prevFormData[category],
                [muscleGroup]: prevFormData[category][muscleGroup].filter((i) => i !== item),
              },
            };
            return newFormData;
          } else {
            // Sinon, ajoutez l'élément à la liste
            const newFormData = { 
              ...prevFormData, 
              [category]: {
                ...(prevFormData[category] || {}),
                [muscleGroup]: [...(prevFormData[category] && prevFormData[category][muscleGroup] || []), item],
              },
            };
            return newFormData;
          }
        } else {
          // Le code original pour les autres catégories
          if (prevFormData[category] && prevFormData[category].includes(item)) {
            const newFormData = { 
              ...prevFormData, 
              [category]: prevFormData[category].filter((i) => i !== item),
            };
            return newFormData;
          } else {
            const newFormData = { 
              ...prevFormData, 
              [category]: [...(prevFormData[category] || []), item] 
            };
            return newFormData;
          }
        }
      });
    };


  

  return (
    
    <ScrollView>
        <Text style={sharedStyles.h1}>Days of the Week you can train</Text>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {userProviding.daysOfTheWeek.map((day, index) => (
            <View key={index} style={{ margin: 10, flex: 1 }}>
                <RoundedCheckbox
                text={day.charAt(0)}
                onPress={(checked) => handleCheckboxChange(day, 'daysOfTheWeek')}
                isChecked={formData['daysOfTheWeek'].includes(day)}
                style={{ padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                textStyle={{ fontSize: 18 }}
                checkedColor='#0bc8a5'
                outerStyle={{borderColor: 'grey', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
                />
            </View>
        ))}
        </View>
        <Text style={sharedStyles.h1}>Your aim is ? </Text>
<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
    {userProviding.objectives.map((objective, index) => (
        <View key={index} style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
            <RoundedCheckbox
                text={''}
                onPress={(checked) => handleCheckboxChange(objective, 'objectives')}
                isChecked={formData['objectives'].includes(objective)}
                style={{ padding: 10 }}
                checkedColor='#0bc8a5'
                outerStyle={{borderColor: 'grey', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
            />
            <Text style={{ marginLeft: 10 }}>{objective}</Text>
        </View>
    ))}
</View>
<Text style={sharedStyles.h1}>Targeted Muscles </Text>
{Object.keys(userProviding.targetedMuscles).map((muscleGroup) => (
    <View key={muscleGroup}>
        <Text style={sharedStyles.h2}>{muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)}</Text>
        <RoundedCheckbox
            text="All"
            onPress={() => handleSelectAllChange(muscleGroup)}
            isChecked={formData.targetedMuscles[muscleGroup].length === userProviding.targetedMuscles[muscleGroup].length}
            style={{ padding: 10 }}
            checkedColor='#0bc8a5'
            outerStyle={{borderColor: 'grey', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap',borderTopWidth: 1, borderTopColor: '#000' }}>
        {userProviding.targetedMuscles[muscleGroup].map((muscle, index) => (
        <View key={index} style={{ margin: 10, flexDirection: 'row', alignItems: 'center' }}>
            <RoundedCheckbox
                text={''}
                onPress={(checked) => handleCheckboxChange(muscle, 'targetedMuscles', muscleGroup)}
                isChecked={formData['targetedMuscles'] && Object.values(formData['targetedMuscles']).some(array => Array.isArray(array) && array.includes(muscle))}                        
                checkedColor='#0bc8a5'
                outerStyle={{borderColor: 'grey', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
            />
            <Text style={{ marginLeft: 10 }}>{muscle}</Text>
        </View>
            ))}
        </View>
    </View>
))}






<Button title="Submit" onPress={handleSubmit} />

{isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}





    </ScrollView>
    );
}
