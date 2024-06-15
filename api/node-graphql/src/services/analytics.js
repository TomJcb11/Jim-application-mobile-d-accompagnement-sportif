const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getSessionDataAndDate(weekPlanId) {
  return await prisma.workoutSession.findMany({
    select: {
      sessionData: true,
      currentDate: true
    },
    where: {
      weekPlanId: weekPlanId
    },
    orderBy: {
      currentDate: 'asc'
    }
  });
}

// Utilisation de async/await pour attendre la réponse
async function displaySessions(weekplanId) {
  const sessions = await getSessionDataAndDate(weekplanId);
  let sessionDataByDate = {};

  sessions.forEach(session => {
    const sessionDate = session.currentDate;
    const sessionData = JSON.parse(session.sessionData);

    // Transforme les données de la session pour ne garder que les propriétés nécessaires
    // et filtre les exercices où la valeur de load est une chaîne de caractères
    const transformedData = sessionData
      .filter(exercise => typeof exercise.load !== 'string')
      .map(exercise => ({
        muscle: exercise.muscle,
        name: exercise.name,
        load: exercise.load
      }));

    sessionDataByDate[sessionDate] = transformedData;
  });

  return sessionDataByDate;
}

module.exports = { displaySessions };
