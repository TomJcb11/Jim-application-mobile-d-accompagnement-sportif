import React, { useContext, useEffect, useState  } from 'react';
import { View, Text, Button,ScrollView,StyleSheet,Alert,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import { sharedStyles } from '../shared/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { RoundedCheckbox } from "react-native-rounded-checkbox";



import WeekPlanContext from '../contexts/weekPlanContext';
import AuthContext from '../contexts/AuthContext';



const NewSessionScreen = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { programData,weekPlanId } = useContext(WeekPlanContext);
  const [dailyExercises, setDailyExercises] = useState([]);
  const [currentDay, setCurrentDay] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  let sessionData = [];

  function convertirChaineEnDate(chaineDate) {
    //mocking data for analytics purpose
    // La chaîne de date est attendue au format 'JJ/MM/AAAA'
    const parties = chaineDate.split('/');
    // Création d'un objet Date à partir des parties de la chaîne
    // Notez que le mois est indexé à partir de 0, donc on soustrait 1
    // On définit l'heure à 12:00 pour éviter les problèmes de fuseau horaire
    const date = new Date(parties[2], parties[1] - 1, parties[0], 12, 0);
  
    // Retourne un objet contenant la date et le jour de la semaine en anglais
    return {
      date: date,
      weekDay: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
}
  const today = new Date()
  const weektoday=today.toLocaleDateString('en-US', { weekday: 'long' });

  const handleCreateWorkoutSession = async () => {
    Alert.alert('Training session completed', '¤ Good Job you complete your daily dosis of training. \n ¤ Your exercises feeling will be send to our database in order to adjust your next WeekPlan.')

    try {
      const response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateWorkoutSession($workoutSession: WorkoutSessionInput!) {
              createWorkoutSession(workoutSession: $workoutSession) {
                currentDate
                sessionData 
                weekPlanId
              }
            }
          `,
          variables: {
            workoutSession: {
              currentDate: today,
              weekPlanId: weekPlanId,
              healthIssues: user.healthIssue,
              sessionData: sessionData
            }
          },
        }),
      });
  
      const api_response = await response.json();
      if (api_response.data && api_response.data.createWorkoutSession) {
        console.log("Workout session created successfully");
        Alert.alert("Workout session created successfully");
      } else {
        console.error("Error creating workout session:", api_response.errors);
      }
    } catch (error) {
      console.error("Error creating workout session:", error);
    }
  }

  useEffect(() => {
    // Vérifie si programData existe et contient des données
  if (programData && Object.keys(programData).length > 0) {
    setCurrentDay(weektoday);
    const todayActivities = programData[weektoday];
    
    if (todayActivities === "Rest") {
      setDailyExercises([]); 
    } else if (todayActivities) {
      setDailyExercises(todayActivities.flat());
    } else {
      setDailyExercises([]);
    }
  } else {
    // Gère le cas où programData est vide ou non défini
    console.log("No program data available");
    // Vous pouvez également définir dailyExercises à un tableau vide ici
    // pour éviter d'autres erreurs liées à son utilisation.
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
        muscle: exercise.muscle,
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps === "Failure" ? "Default Reps Value" : exercise.reps,
        rest: exercise.rest,
        load: exercise.charge !== undefined ? exercise.charge : "Default Load Value",
        status: status
    };

    // Recherche d'un exercice existant avec le même nom, indépendamment du muscle ou du statut
    let existingExerciseIndex = sessionData.findIndex(item => item.name === exercise.name);

    // Si l'exercice existe déjà, remplacer l'existant
    if (existingExerciseIndex !== -1) {
        sessionData[existingExerciseIndex] = exerciseData;
    } else {
        sessionData.push(exerciseData);
    }

    console.log("Session Data :", sessionData);
}


  

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
        <Text style={sharedStyles.h1}>It seems that you do not have a program yet.</Text>
        <View style={{ flexDirection: 'row' }}>
          <Feather name="arrow-right" size={180} color="#147efb" />
          <FontAwesome5 name="calendar-week" size={180} color="#147efb" />
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
           <View style={{ flexDirection: 'row',alignItems:'flex-end',  justifyContent: 'flex-end',marginRight:10,marginTop:10 }}>
                      <TouchableOpacity
                        onPress={() => handleCreateWorkoutSession() }
                        style={{borderRadius:100 }}
                      >
                        <Ionicons name="checkmark-done-circle" size={40} color="#137f13" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => Alert.alert('Tips', '¤ By clicking any exercise you can see a quick explanation of how does it works \n ¤ You will need to vote up or down on each exercise based on how easily you were able to do it. \n ¤ When your training is complete (be sure you checked all slides of the swiper) press the checkmark button ton complete your training session')}
                        style={{borderRadius:100 }}
                      >
                        <FontAwesome5 name="lightbulb" size={40} color="#ffd700" />
                      </TouchableOpacity>
            </View>

            <Text style={sharedStyles.h1}>{currentDay}</Text>

        
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
