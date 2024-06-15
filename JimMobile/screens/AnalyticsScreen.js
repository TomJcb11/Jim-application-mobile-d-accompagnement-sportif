import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { sharedStyles } from '../shared/style';
import AuthContext from '../contexts/AuthContext';
import WeekPlanContext from '../contexts/weekPlanContext';

function AnalyticsComponent() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { weekPlanId } = useContext(WeekPlanContext);
  const [uniqueMuscles, setUniqueMuscles] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      if (isAuthenticated && user && weekPlanId) {
        const response = await fetch(process.env.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query GetAnalytics($weekplanId: ID!) {
                getAnalytics(weekplanId: $weekplanId) {
                  analytics {
                    name
                    muscle
                    load
                  }
                    date
                }
              }
            `,
            variables: {
              weekplanId: weekPlanId,
            },
          }),
        });

        const { data } = await response.json();
        
        if (!data.getAnalytics || data.getAnalytics.length === 0) {
          setAnalysis(null);
        } else {
          setAnalysis(data.getAnalytics);
          const muscles = data.getAnalytics.flatMap(entry => entry.analytics.map(exercise => exercise.muscle));
          setUniqueMuscles([...new Set(muscles)]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [weekPlanId, isAuthenticated]);

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscle);
  };

  const formatDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
      return 'Invalid Date';
    }
  
    const dateObj = new Date(dateString);
  
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
  
    const day = dateObj.getDate().toString().padStart(2, '0'); // Obtient le jour et le padStart assure qu'il est sur 2 chiffres
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Obtient le mois (0-indexed) et le padStart assure qu'il est sur 2 chiffres
  
    return `${day}/${month}`;
  };

  const renderExerciseTables = () => {
    if (!selectedMuscle || !analysis) {
      return null;
    }
  
    const exercisesForMuscle = analysis.flatMap(entry => 
      entry.analytics.filter(ex => ex.muscle === selectedMuscle)
      .map(ex => ({ ...ex, date: entry.date }))
    );
    
  
    const exerciseNames = [...new Set(exercisesForMuscle.map(ex => ex.name))];
  
    return exerciseNames.map(exerciseName => {
      const filteredExercises = exercisesForMuscle.filter(ex => ex.name === exerciseName);
  
      return (
        <View key={exerciseName} style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>{exerciseName}</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Date</Text>
              <Text style={styles.columnHeader}>Load</Text>
            </View>
            {filteredExercises.map((exercise, index) => (
              <View key={`${exercise.name}-${index}`} style={styles.tableRow}>
               <Text style={styles.cell}>{formatDate(exercise.date)}</Text>
                <Text style={styles.cell}>{exercise.load} kg</Text>
              </View>
            ))}
          </View>
        </View>
      );
    });
  };


  if (!isAuthenticated) {
    return (
      <View>
        <Text style={sharedStyles.h1}>Vous devez être connecté pour accéder à cette page.</Text>
        <View style={{ flexDirection: 'row' }}>
          <Feather name="arrow-right" size={180} color="#147efb" />
          <MaterialCommunityIcons name="human-edit" size={180} color="#000" />
        </View>
      </View>
    );
  }

  if (!weekPlanId) {
    return (
      <View>
        <Text style={sharedStyles.h1}>Il semble que vous n'ayez pas encore de programme.</Text>
        <View style={{ flexDirection: 'row' }}>
          <Feather name="arrow-right" size={180} color="#147efb" />
          <FontAwesome5 name="calendar-week" size={180} color="#147efb" />
        </View>
      </View>
    );
  }

  if (isLoading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView>
      <Text style={sharedStyles.h2}>Pick-up a Muscle</Text>
      <View style={styles.buttonContainer}>
        {uniqueMuscles.map(muscle => (
          <Button key={muscle} title={muscle} onPress={() => handleMuscleClick(muscle)} style={styles.listItem}></Button>
        ))}
      </View>
      {selectedMuscle && (
        <View style={styles.analyticsContainer}>
          <Text style={sharedStyles.h2}>{selectedMuscle} history</Text>
          {renderExerciseTables()}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  analyticsContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  exerciseContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableContainer: {
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingBottom: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cell: {
    fontSize: 16,
  },
});

export default AnalyticsComponent;
