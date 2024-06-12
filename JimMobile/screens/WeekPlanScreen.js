import React, { useContext, useEffect,useState } from 'react';
import { View, Text, Button,StyleSheet,ScrollView,Alert,ActivityIndicator,TouchableOpacity} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import { useQuery, gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { sharedStyles } from '../shared/style';

import WeekPlanContext from '../contexts/weekPlanContext';
import AuthContext from '../contexts/AuthContext';





export default function WeekPlanScreen() {
  const { isAuthenticated, user } = useContext(AuthContext);

  const { userProviding, programData, weekPlan,weekPlanId } = useContext(WeekPlanContext);
  const navigation = useNavigation();
  const { setProgramData,setweekPlanId } = useContext(WeekPlanContext);

  const [isLoading, setIsLoading] = useState(true);

  const weekDaysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  


  const fetchWeekPlan = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated){
          const response = await fetch(process.env.API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: `
              query WeekPlan($programUserId: ID!) {
                weekPlan(programUserId: $programUserId) {
                  programData
                  id
                }
              }
              `,
              variables: {
                programUserId: user.userId,
              },
            }),
          });
    
          const data = await response.json();
          

          if (data.data.weekPlan === null) {
            setProgramData(null);
            setweekPlanId(null)
           

          } else {
            setProgramData(data.data.weekPlan.programData);
            console.log("context program data updated")
            setweekPlanId(data.data.weekPlan.id)
            console.log("context program id updated")
        }
         console.log(
              "\n A user has just ask for his weekPlan :\n",
              " email :",user.email,'\n',
              " userId :",user.userId,'\n',
              
              " programData :",data,
              " weekPlanId :",data.data.weekPlan.id,'\n',)
        }
      }
    catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  };
  

  useEffect(() => {
    if (isAuthenticated || user) {
      fetchWeekPlan();
      console.log("AuthContext:", { isAuthenticated, user });
    };
  }, [isAuthenticated,user,weekPlan]);
 


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f8f8f8',
    },
    day: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
      
    },
    exerciseContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    exercise: {
      fontSize: 16,
      color: '#147efb',
      display : "flex",
      marginBottom: 5,
    },
    infoBox: {
      padding: 10,
      backgroundColor: '#eee',
      borderRadius: 5,
      marginBottom: 10,
    },
    infoText: {
      fontSize: 14,
      color: '#333',
      marginBottom: 5,
    },
    activity:{
      color:'red'
    }
  });
  return (
    <ScrollView style={styles.container}>
      {isAuthenticated ? (
        isLoading ? (
          <ActivityIndicator style={styles.activity} />
        ) : (
          programData !== null ?(
            <>
               <View style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity
                        onPress={() => Alert.alert('Tips', 'By clicking any muscles you can see all the exercises that are programmed for your sessions, further informations will be dispensed during the session.')}
                        style={{borderRadius:100 }}
                      >
                        <FontAwesome5 name="lightbulb" size={40} color="#ffd700" />
                      </TouchableOpacity>
                    </View>
                    <Text style={sharedStyles.h1}>Your training plan.</Text>
                    <Button title="Reload week plan" onPress={fetchWeekPlan} />

              {weekDaysOrder.map((day, index) => {
                const exercises = programData[day];
                return (
                  <View key={index}>
                    <Text style={styles.day}>{day}</Text>
                    {Array.isArray(exercises) ? (
                      exercises.map((exercise, index) => (
                        <View key={index} style={styles.exerciseContainer}>
                          {Object.entries(exercise).map(([muscle, muscleExercises], index) => (
                            <Text 
                              key={index} 
                              style={styles.exercise}
                              onPress={() => Alert.alert(
                                muscle, 
                                muscleExercises.map(ex => `¤ ${ex.name}`).join('\n')
                              )}
                            >
                              {muscle}
                            </Text>
                          ))}
                        </View>
                      ))
                    ) : (
                      <Text style={styles.infoText}>{exercises}</Text>
                    )}
                    
                  </View>
                );
              })}
            </>
          ) :  (
              <View>
                <Text style={styles.infoText}> ¤ It seems that you have any training plan yet</Text>
                <Text style={styles.infoText}> ¤ Creating your own weekly training plan gives you the flexibility to tailor your workouts to your specific needs and goals.</Text>
                <Button title="Create my own Week Plan" onPress={() => navigation.navigate('WeekPlanForm')} />
              </View>
            )
          )
        ) : (
          <View>
            <Text style={sharedStyles.h1}>No training plan yet ? </Text>
            <View style={styles.infoBox}>
            <Text style={styles.infoText}> ¤ First be sure that you are logged in.</Text>
              <Text style={styles.infoText}> ¤ We recommend a health check-up with a doctor so you can see where you stand, including a blood test, electrocardiogram, and stress test.</Text>
              <Text style={styles.infoText}> ¤ After 3 consecutive days of training we recommend to take a rest day.</Text>
              <Text style={styles.infoText}> ¤ You will make your own weekly plan, choosing :</Text>
              <Text style={styles.infoText}>   - The days of your training</Text>
              <Text style={styles.infoText}>   - Type of training (cardio, stretching, strength, ...)</Text>
              <Text style={styles.infoText}>   - The zones and muscles you want to mainly focus</Text>
              <Text style={styles.infoText}>   - We recommend one Zone / training day</Text>
            </View>
          </View>
        )
      }
    </ScrollView>
  
)
}

