// Importez l'instance Prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getLastSessionDataByWeekPlanId(weekPlanId) {
    try {
        const lastSession = await prisma.WorkoutSession.findMany({
            where: {
                weekPlanId: weekPlanId,
            },
            orderBy: {
                currentDate: 'desc',
            },
            take: 1,
        });

        if (lastSession.length === 0) {
            console.log("Aucune session trouvée pour ce weekPlanId.");
            return null;
        }

        // Retourner directement les données de la session
        return lastSession[0].sessionData;
    } catch (error) {
        console.error("Erreur lors de la récupération de la dernière session :", error);
        return null;
    }
}

async function updateScaling(weekplanId) {
    try {
        const weekPlan = await prisma.weekPlan.findUnique({
            where: {
                id: weekplanId,
            },
            select: {
                programData: true,
            },
        });

        if (!weekPlan) return null;

        let exercisesByMuscle = {};

        // Supposons que getLastSessionDataByWeekPlanId retourne une chaîne JSON des exercices de la dernière session
        const lastSessionDataString = await getLastSessionDataByWeekPlanId(weekplanId);
        const lastSessionData = lastSessionDataString ? JSON.parse(lastSessionDataString) : [];

        Object.keys(weekPlan.programData).forEach(day => {
            if (Array.isArray(weekPlan.programData[day])) {
                weekPlan.programData[day].forEach(muscleGroup => {
                    Object.keys(muscleGroup).forEach(muscle => {
                        if (!exercisesByMuscle[muscle]) {
                            exercisesByMuscle[muscle] = [];
                        }
                        if (Array.isArray(muscleGroup[muscle])) {
                            muscleGroup[muscle].forEach(exercise => {
                                // Trouver l'exercice correspondant dans les données de la dernière session
                                const lastSessionExercise = lastSessionData.find(e => e.name === exercise.name);
                                // Si l'exercice est marqué comme 'OK', augmenter la charge
                                const updatedLoad = lastSessionExercise && lastSessionExercise.status === 'OK' && lastSessionExercise.load ? exercise.charge + 5 : exercise.charge;
                                exercisesByMuscle[muscle].push({
                                    name: exercise.name,
                                    load: updatedLoad
                                });
                            });
                        }
                    });
                });
            }
        });

        const userScalingValue = JSON.stringify(exercisesByMuscle);

        // Utiliser Prisma pour mettre à jour le champ userScaling
        prisma.weekPlan.update({
            where: {
                id: weekplanId, // Assurez-vous que weekPlanId est défini et accessible
            },
            data: {
                userScaling: userScalingValue,
            },
        }).then(updatedWeekPlan => {
            console.log('Données de userScaling mises à jour avec succès:');
            return updatedWeekPlan
            // Retourner ou traiter updatedWeekPlan selon les besoins de votre application
        }).catch(error => {
            console.error('Erreur lors de la mise à jour du userScaling:', error);
            // Gérer l'erreur comme nécessaire
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données du programme :", error);
        return null;
    }
}

module.exports =  updateScaling ;
//console.log(updateScaling('clxeudcfx000115om6ny0e66r'))