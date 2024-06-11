const getExercises = require('./dataProvider');

function checkMuscleGroups(userProvided) {
    console.log('Creating WeekPlan')
    const muscleGroups = Object.values(userProvided.targetedMuscles);
    const nonEmptyMuscleGroups = muscleGroups.filter(group => group.length > 0);
    if (nonEmptyMuscleGroups.length > userProvided.daysOfTheWeek.length) {
        throw new Error("You cannot choose more workout sessions than available days.");
    }
}

function getDayIndex(day, weekDays) {
    return weekDays.indexOf(day);
}

function getRandomExercises(exercises, userProvided) {
    let randomExercises = [];
    if (exercises.length < 4) {
        randomExercises = [...exercises];
        if (userProvided.objectives.includes('cardio')) {
            randomExercises.push('cardio');
        }

        if (userProvided.objectives.includes('stretching')) {
            randomExercises.push('stretching');
        }
    } else {
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * exercises.length);
            randomExercises.push(exercises[randomIndex]);
            exercises.splice(randomIndex, 1); // Pour éviter les doublons
        }
    }
    return randomExercises;
}

async function getExerciseData(randomExercises) {
    for (let i = 0; i < randomExercises.length; i++) {
        let exercise = randomExercises[i];
        let options = {};
        if (exercise === 'cardio' || exercise === 'stretching') {
            options.type = exercise;
        } else {
            options.muscle = exercise;
        }

        try {
            const exerciseData = await getExercises(options);
            for (let j = 0; j < exerciseData.length; j++) {
              exerciseData[j].sets = 3;
              exerciseData[j].rest = 120;
              exerciseData[j].reps = "Failure";
              if (exerciseData[j].equipment!='body_only'){
                exerciseData[j].charge = 10;
                exerciseData[j].sets = 6;
                exerciseData[j].reps = 12;
              }
                
          }
            const firstExercises = exerciseData.slice(0, 3);
            randomExercises[i] = { [exercise]: firstExercises }; // Remplacez l'exercice par le tableau des trois premiers exercices
        } catch (error) {
            console.error('Failed to fetch exercises:', error);
        }
    }
    return randomExercises;
}

async function generateWeeklyPlan(userProvided) {
  const plan = {};
  const exercisesPerDay = 4; // Nombre d'exercices par jour
  const muscleGroups = Object.keys(userProvided.targetedMuscles);
  let muscleGroupIndex = 0;
  let daysTrained = 0;
  let previousDayIndex = -1;
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  checkMuscleGroups(userProvided, muscleGroups);

  for (const day of userProvided.daysOfTheWeek) {
      plan[day] = [];
      const currentDayIndex = getDayIndex(day, weekDays);

      // Vérifiez si les jours d'entraînement sont consécutifs
      if (previousDayIndex !== -1 && currentDayIndex !== previousDayIndex + 1) {
          daysTrained = 0;
      }

      if (daysTrained === 3) {
          plan[day] = 'Rest';
          daysTrained = 0;
          continue;
      }

      daysTrained++;
      previousDayIndex = currentDayIndex;

      const muscleGroup = muscleGroups[muscleGroupIndex % muscleGroups.length];
      muscleGroupIndex++;

      const exercises = userProvided.targetedMuscles[muscleGroup];
      let randomExercises = getRandomExercises(exercises, userProvided);

      randomExercises = await getExerciseData(randomExercises);


      plan[day] = randomExercises;
  }
  return plan;
}

module.exports = generateWeeklyPlan;