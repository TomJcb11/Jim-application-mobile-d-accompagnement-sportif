const  GraphQLJSON  = require('graphql-type-json');
const cuid = require('cuid');
const bcrypt = require('bcrypt');
const  prisma = require('./prismaClient.js')
const { DateTimeResolver } = require('graphql-scalars');
const jwt = require('jsonwebtoken');

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


    weekPlan: (_parent, { id }) => {
      return prisma.weekPlan.findUnique({
        where: {
          id: id
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

  },
  Mutation: {
    createUser: async (_parent, { user }) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const birthDate = new Date(user.userBirthDate);
      if (birthDate > new Date()) {
        throw new Error('Birth date cannot be in the future');
      }
      const newUser = await prisma.user.create({
        data: {
          ...user,
          userLevel:0,
          userXp:0,

          password: hashedPassword, 
          userId: generateId(),
          userBirthDate: new Date(user.userBirthDate).toISOString(),
          userInscriptionDate: new Date().toISOString(),
        },
      });
      return newUser;
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
      const newPlan = await prisma.weekPlan.create({
        data: weekPlan
      });
      return newPlan;
    },
    createWorkoutSession: async (_parent, { workoutSession }) => {
      const newSession = await prisma.workoutSession.create({
        data: workoutSession
      });
      return newSession;
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