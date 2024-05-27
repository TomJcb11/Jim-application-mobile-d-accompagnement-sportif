const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Données pour le modèle User
  const user = await prisma.user.create({
    data: {
      userBirthDate: new Date('1980-01-01'),
      userSex: 'M',
      bodyHeight: 180.0,
      userLevel: 1,
      userXp: 0,
      name: "User 1",
      email: "user1@example.com",
    },
  });

  // Données pour le modèle UserHealthIssue
  const userHealthIssue = await prisma.userHealthIssue.create({
    data: {
      user: {
        connect: {
          userId: user.userId,
        },
      },
      healthIssue: 'none',
    },
  });

  // Données pour le modèle Levels
  const level = await prisma.levels.create({
    data: {
      levelDescription: "Level 1",
      xpRequired: 100,
      repsMultiplier: 1,
      chargeMultiplier: 1,
    },
  });

  // Données pour le modèle Muscles
  const muscle = await prisma.muscles.create({
    data: {
      muscleDescription: "Biceps",
    },
  });

  // Données pour le modèle Equipements
  const equipement = await prisma.equipements.create({
    data: {
      equipementDescription: "Dumbbell",
    },
  });

  // Données pour le modèle Exercises
  const exercise = await prisma.exercises.create({
    data: {
      exerciceName: "Bicep Curl",
      exerciseDescription: "A bicep curl with a dumbbell",
      exerciseIntensities: 'medium',
      exerciseLevel: {
        connect: {
          levelId: level.levelId,
        },
      },
      exerciseEquipement: {
        connect: {
          equipementId: equipement.equipementId,
        },
      },
      xpGain: 100,
      reps: "10",
      sets: "3",
      rest: "60 seconds",
      charge: "10 kg",
      kind: 'strengh',
    },
  });

  // Données pour le modèle Instructions
  const instruction = await prisma.instructions.create({
    data: {
      level: {
        connect: {
          levelId: level.levelId,
        },
      },
      lowerValue: 1,
      upperValue: 10,
      multiplier: 1.0,
      instructionDescription: "Do 10 reps for 3 sets with 60 seconds rest in between.",
    },
  });

  // Données pour le modèle ExerciseXMedia
  const exerciseXMedia = await prisma.exerciseXMedia.create({
    data: {
      exercise: {
        connect: {
          exerciseId: exercise.exerciseId,
        },
      },
      mediaUrl: "https://example.com/media/bicep-curl",
    },
  });

  // Données pour le modèle ExerciseXMuscles
  const exerciseXMuscles = await prisma.exerciseXMuscles.create({
    data: {
      exercise: {
        connect: {
          exerciseId: exercise.exerciseId,
        },
      },
      muscle: {
        connect: {
          muscleId: muscle.muscleId,
        },
      },
    },
  });

  // Données pour le modèle WeekPlan
  const weekPlan = await prisma.weekPlan.create({
    data: {
      programOwner: {
        connect: {
          userId: user.userId,
        },
      },
      infrastructureAvailability: 'home',
      programData: {
        workouts: ["Bicep Curl"],
      },
    },
  });

  // Données pour le modèle WorkoutSession
  const workoutSession = await prisma.workoutSession.create({
    data: {
      weekPlan: {
        connect: {
          id: weekPlan.id,
        },
      },
      sessionData: {
        exercises: ["Bicep Curl"],
      },
      healthIssues: 'none',
      currentDate: new Date(),
    },
  });

  // Données pour le modèle UserBody
  const userBody = await prisma.userBody.create({
    data: {
      user: {
        connect: {
          userId: user.userId,
        },
      },
      bodyWeight: 80.0,
    },
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });