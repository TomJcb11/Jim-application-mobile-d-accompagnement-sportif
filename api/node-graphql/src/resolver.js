const  GraphQLJSON  = require('graphql-type-json');
const cuid = require('cuid');
const bcrypt = require('bcryptjs');
const  prisma = require('./prismaClient.js')
const { DateTimeResolver } = require('graphql-scalars');
const jwt = require('jsonwebtoken');

const generateWeeklyPlan = require('./services/generateWeeklyPlan.js')
const updateScaling = require('./services/userScaling.js')
const adjustExerciseLoad = require('./services/updateWeekplan.js')

function generateId() {
  return cuid();
}


const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    user: (_parent, { userId }) => {
      return prisma.user.findUnique({
        where: {
          userId: userId
        }
      });
    },
    users: () => {
      return prisma.user.findMany();
    },


    userHealthIssue: (_parent, { id }) => {
      return prisma.userHealthIssue.findUnique({
        where: {
          id: id
        }
      });
    },
    userHealthIssues: () => {
      return prisma.userHealthIssue.findMany();
    },


    level: (_parent, { levelId }) => {
      return prisma.levels.findUnique({
        where: {
          levelId: levelId
        }
      });
    },
    levels: () => {
      return prisma.levels.findMany();
    },


    muscle: (_parent, { muscleId }) => {
      return prisma.muscles.findUnique({
        where: {
          muscleId: muscleId
        }
      });
    },
    muscles: () => {
      return prisma.muscles.findMany();
    },



    equipement: (_parent, { equipementId }) => {
      return prisma.equipements.findUnique({
        where: {
          equipementId: equipementId
        }
      });
    },
    equipements: () => {
      return prisma.equipements.findMany();
    },


    exercise: (_parent, { exerciseId }) => {
      return prisma.exercises.findUnique({
        where: {
          exerciseId: exerciseId
        }
      });
    },
    exercises: () => {
      return prisma.exercises.findMany();
    },


    exerciseXMedia: (_parent, { id }) => {
      return prisma.exerciseXMedia.findUnique({
        where: {
          id: id
        }
      });
    },
    exerciseXMedias: () => {
      return prisma.exerciseXMedia.findMany();
    },
    
    exerciseXMuscle: (_parent, { id }) => {
      return prisma.exerciseXMuscles.findUnique({
        where: {
          id: id
        }
      });
    },
    exerciseXMuscles: () => {
      return prisma.exerciseXMuscle.findMany();
    },


    weekPlan: (_parent, { programUserId }) => {
      return prisma.weekPlan.findUnique({
        where: {
          programUserId: programUserId
        }
      });
    },
    weekPlans: () => {
      return prisma.weekPlan.findMany();
    },


    workoutSession: (_parent, { id }) => {
      return prisma.workoutSession.findUnique({
        where: {
          id: id
        }
      });
    },
    workoutSessions: () => {
      return prisma.workoutSession.findMany();
    },


    userBody: (_parent, { id }) => {
      return prisma.userBody.findUnique({
        where: {
          id: id
        }
      });
    },
    userBodies: () => {
      return prisma.userBody.findMany();
    },
    getUserIssues: async (_, { userId }, { db }) => {
      // Remplacer 'db.getHealthIssuesByUserId' par votre méthode réelle pour récupérer les problèmes de santé
      return prisma.UserHealthIssue.findMany({
        where: {
          userId:userId
        }
      });
    }


  },
  Mutation: {
    createUser: async (_parent, { user }) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      //a bunch of test for new users
      const birthDate = new Date(user.userBirthDate);
      if (birthDate > new Date()) {
        throw new Error('Birth date cannot be in the future');
      }
      const existingUser = await prisma.user.findUnique({
        where: { phoneNumber: user.phoneNumber },
      });
      if (existingUser) {
        throw new Error('This phone number is already associated with an account');
      }
      const phoneNumberRegex = /^[0-9]*$/;
      if (!phoneNumberRegex.test(user.phoneNumber)) {
        throw new Error('Phone number should not contain letters');
      }
      const existingUserWithEmail = await prisma.user.findUnique({
        where: { email: user.email },
      });
      if (existingUserWithEmail) {
        throw new Error('This email is already associated with an account');
      }

    
      try {
        const newUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            phoneNumber: user.phoneNumber,
            userSex: user.userSex,
            bodyHeight: user.bodyHeight,
            userBirthDate: birthDate,
            userInscriptionDate: new Date(),
            userLevel: 0,
            userXp: 0,
          },
        })
        console.log("New user correctly added");
        const userBodyData = user.userBody.map(body => ({
          ...body,
          userId: newUser.userId,
          bodyWeight: body.bodyWeight,
          measuringDate: body.measuringDate,
          
        }));
        
        
    
        const healthIssueData = user.healthIssue.map(issue => ({
          ...issue,
          userId: newUser.userId,
          id: cuid(),
          healthIssue: issue.healthIssue,
        }));
    
        await prisma.$transaction([
          prisma.UserBody.createMany({ data: userBodyData }),
          prisma.UserHealthIssue.createMany({ data: healthIssueData }),
        ]);
        console.log('transaction done')
        return newUser;
      } catch (error) {
        // Gérer les erreurs ici
        console.error(error);
        throw error;
      }
    },




    login: async (parent, { email, password }, context) => {
      const user = await context.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error('No such user found');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, 'your-secret-jwt-key');

      return {
        token,
        user,
      };
    }, 
    createUserHealthIssue: async (_parent, { userHealthIssue }) => {
      const newHealthIssue = await prisma.userHealthIssue.create({
        data: userHealthIssue
      });
      return newHealthIssue;
    },
    createLevels: async (_parent, { level }) => {
      const newLevel = await prisma.levels.create({
        data: level
      });
      return newLevel;
    },
    createMuscles: async (_parent, { muscle }) => {
      const newMuscle = await prisma.muscles.create({
        data: muscle
      });
      return newMuscle;
    },
    createEquipements: async (_parent, { equipement }) => {
      const newEquipement = await prisma.equipement.create({
        data: equipement
      });
      return newEquipement;
    },
    createExercises: async (_parent, { exercise }) => {
      const newExercise = await prisma.exercise.create({
        data: exercise
      });
      return newExercise;
    },
    createExerciseXMedia: async (_parent, { exerciseXMedia }) => {
      const newMedia = await prisma.exerciseMedia.create({
        data: exerciseXMedia
      });
      return newMedia;
    },
    createExerciseXMuscles: async (_parent, { exerciseXMuscles }) => {
      const newMuscle = await prisma.exerciseMuscle.create({
        data: exerciseXMuscles
      });
      return newMuscle;
    },
    createWeekPlan: async (_parent, { weekPlan }) => {
        // Génération du programData à partir des données fournies
        const programData = await generateWeeklyPlan(weekPlan.dataProviding);

        // Ajout du programData au weekPlan
        weekPlan.programData = programData;

        // Création du nouveau plan d'entraînement avec Prisma
        const newPlan = await prisma.weekPlan.create({
          data: weekPlan
      });
    return newPlan;
    },
    createWorkoutSession: async (_, { workoutSession }) => {
      const { weekPlanId, currentDate, sessionData, healthIssues } = workoutSession;
    
      try {
        const newSession = await prisma.workoutSession.create({
          data: {
            weekPlanId,
            currentDate,
            sessionData: JSON.stringify(sessionData), // Convertir en JSON string si nécessaire
            healthIssues: JSON.stringify(healthIssues) // Directement stocker comme JSON
          }
        })
        
          
          updateScaling(weekPlanId);
          console.log('scaling updated');
          adjustExerciseLoad(weekPlanId);
          console.log('program load  updated');
        
    
        return newSession;
      } catch (error) {
        throw new Error(`Failed to create workout session: ${error.message}`);
      }
    },
    createUserBody: async (_parent, { userBody }) => {
      const newBody = await prisma.userBody.create({
        data: userBody
      });
      return newBody;
    },
  },
};

module.exports = resolvers;