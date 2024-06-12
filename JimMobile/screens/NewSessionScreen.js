import React, { useContext, useEffect, useState  } from 'react';
import { View, Text, Button,ScrollView,StyleSheet,Alert,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { sharedStyles } from '../shared/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { RoundedCheckbox } from "react-native-rounded-checkbox";



import WeekPlanContext from '../contexts/weekPlanContext';
import AuthContext from '../contexts/AuthContext';



const NewSessionScreen = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { programData } = useContext(WeekPlanContext);
  const [dailyExercises, setDailyExercises] = useState([]);
  const [currentDay, setCurrentDay] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  let sessionData = [];



  useEffect(() => {
    //const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const today = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentDay(today);
    const todayActivities = programData[today];
    
  
    if (todayActivities === "Rest") {
      // Correction: Définir dailyExercises comme un tableau vide ou avec un élément représentant le repos
      setDailyExercises([]); 
      
    } else if (todayActivities) {
      // Assurez-vous que todayActivities est un tableau avant de l'aplatir
      setDailyExercises(todayActivities.flat());
    } else {
      // Si todayActivities n'est pas défini ou n'est pas un tableau, définissez dailyExercises à un tableau vide
      setDailyExercises([]);
    }
  }, [programData]);

  function addExerciseToSession(exercise, status) {
    // Assurez-vous que la propriété muscle de l'exercice est bien définie
    if (!exercise.muscle) {
        console.error("Le muscle de l'exercice n'est pas défini.");
        return;
    }

    const exerciseData = {
        [exercise.muscle]: {
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            rest: exercise.rest,
            load: exercise.charge !== undefined ? exercise.charge : "Default Load Value",
            status: status
        }
    };

    // Utilisation de l'opérateur optionnel de chaînage pour éviter les erreurs si la propriété n'existe pas
    if (exerciseData[exercise.muscle]?.reps === "Failure") {
        exerciseData[exercise.muscle].reps = "Default Reps Value";
    }

    // Recherche d'un exercice existant en prenant en compte tous les noms de muscles et le statut
    let existingExerciseIndex = sessionData.findIndex((item) => item[exercise.muscle]?.name === exercise.name && item[exercise.muscle]?.status === status);

    // Si l'exercice existe déjà avec le même statut, ne rien faire
    if (existingExerciseIndex === -1) {
        sessionData.push(exerciseData);
        console.log(sessionData)
    }
};

  

  if (!isAuthenticated) {
    return (
      <View>
        <Text style={sharedStyles.h1}>You must be logged in to access this page.</Text>
        <View style={{ flexDirection: 'row' }}>
          <Feather name="arrow-right" size={180} color="#147efb" />
          <MaterialCommunityIcons name="human-edit" size={180} color="#000"/>
        </View>
      </View>
    );
  } else if (!programData) {
    return (
      <View>
        <Text>{JSON.stringify(programData)}</Text>
        <Text style={sharedStyles.h1}>It seems that you do not have a program yet.</Text>
        <View style={{ flexDirection: 'row' }}>
          <Feather name="arrow-right" size={180} color="#147efb" />
          <FontAwesome5 name="calendar-week" size={24} color="#147efb" />
        </View>
      </View>
    );
  } else if (dailyExercises.length === 0) {
    return (
      <View>
        <Text style={sharedStyles.h1}>{currentDay}</Text>
        <Text> It is a rest day </Text>
      </View>
    );
}
  
  
  else {
    return (
      <View>
           <View style={{ alignItems: 'flex-end', marginRight:10,marginTop:10 }}>
                      <TouchableOpacity
                        onPress={() => Alert.alert('Tips', '¤ By clicking any exercise you can see a quick explanation of how does it works \n ¤ You will need to vote up or down on each exercise based on how easily you were able to do it.')}
                        style={{borderRadius:100 }}
                      >
                        <FontAwesome5 name="lightbulb" size={40} color="#ffd700" />
                      </TouchableOpacity>
            </View>

        
        <ScrollView style={styles.exerciseContainer}>
          <Swiper showsButtons={true} loop={false}>
            {dailyExercises.map((activity, index) => {
              const muscleGroup = Object.keys(activity)[0];
              const exercises = activity[muscleGroup];
              return (
                <View key={index} style={{ flex: 0.8, justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{muscleGroup}</Text>
                  {exercises.map((exercise, exerciseIndex) => (
                    <View key={exerciseIndex} style={styles.exerciseContainer}>
                      <Text
                          style={styles.exerciseName}
                          onPress={() => setSelectedExercise(selectedExercise === exercise ? null : exercise)}
                        >
                          {exercise.name}
                        </Text>
                        {selectedExercise === exercise && (
                          <Text style={styles.exerciseDescription}>{exercise.instructions}</Text>
                        )}

                      <View style={styles.tableContainer}>
                        <View style={styles.tableHeader}>
                          <Text style={styles.tableHeaderText}>Sets</Text>
                          <Text style={styles.tableHeaderText}>Reps</Text>
                          <Text style={styles.tableHeaderText}>Rests</Text>
                          <Text style={styles.tableHeaderText}>Load</Text>
                        </View>
                        <View style={styles.tableRow}>
                          <Text style={styles.tableRowText}>{exercise.sets}</Text>
                          <Text style={styles.tableRowText}>{exercise.reps}</Text>
                          <Text style={styles.tableRowText}>{exercise.rest}s</Text>
                          <Text style={styles.tableRowText}>{exercise.charge}kg</Text>
                        </View>

                        <View style={ {flexDirection: 'row', display:'flex',}}>
                          <RoundedCheckbox
                            text={'X'}
                            uncheckedColor='#c0161673'
                            checkedColor= '#8B0000'
                            style={{ padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                            textStyle={{ fontSize: 18}}
                            uncheckedTextColor='white'
                            onPress={() => addExerciseToSession(exercise, "nOK")}
                          
                            
                            outerStyle={{borderColor: 'grey', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
                            />
                            <RoundedCheckbox
                            text={'V'}
                            uncheckedColor='#33773392'
                            checkedColor= '#006400'
                            style={{ padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                            textStyle={{ fontSize: 18}}
                            uncheckedTextColor='white'
                            onPress={() => addExerciseToSession(exercise, "OK")}
                            
                            outerStyle={{borderColor: 'grey', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
                            />
                          </View>
                        
                      </View>
                    </View>
                  ))}
                </View>
              );
            })}
          </Swiper>
        </ScrollView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  exerciseContainer: {
    marginBottom: 10,
  },
  exerciseName: {
    fontWeight: 'bold',
    fontSize: 16,
    Color: '#147efb'
  },
  tableContainer: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  tableRowText: {
    fontSize: 14,
  },
  // Ajoutez d'autres styles ici si nécessaire
});
export default NewSessionScreen;
