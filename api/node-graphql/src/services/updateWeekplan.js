const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function adjustExerciseLoad(weekplanId) {
    try {
        const weekPlan = await prisma.weekPlan.findUnique({
            where: {
                id: weekplanId,
            },
            select: {
                programData: true,
                userScaling: true,
            },
        });

        if (!weekPlan) {
            console.error('Plan de semaine non trouvé');
            return;
        }

        const { programData, userScaling } = weekPlan;
        const array = JSON.parse(userScaling);

        Object.keys(programData).forEach(day => {
            const dayActivities = programData[day];
            if (Array.isArray(dayActivities)) {
                dayActivities.forEach(activity => {
                    const muscleGroup = Object.keys(activity)[0];
                    const exercises = activity[muscleGroup];
                    exercises.forEach(exercise => {
                        if (exercise.charge) {
                            const foundExercise = array[muscleGroup] && array[muscleGroup].find(e => e.name === exercise.name);
                            if (foundExercise && exercise.charge !== foundExercise.load) {
                                console.log(muscleGroup, ' => ', exercise.name, ' => ', `Charge mise à jour de ${exercise.charge} à ${foundExercise.load}`);
                                exercise.charge = foundExercise.load;
                            }
                        }
                    });
                });
            }
        });

            
            await prisma.weekPlan.update({
                where: {
                    id: weekplanId,
                },
                data: {
                    programData: programData,
                },
            });
            return programData;

    } catch (error) {
        console.error('Erreur lors de l\'ajustement de la charge des exercices:', error);
        throw error;
    }
}

module.exports = adjustExerciseLoad;

// Pour tester la fonction, assurez-vous de l'appeler dans un contexte approprié où `adjustExerciseLoad` peut être exécutée correctement.
//console.log(adjustExerciseLoad("clxeudcfx000115om6ny0e66r"));