import { Prisma,Exercises, Health, PrismaClient, WeekPlan, WorkoutSession,Intensities,Infrastructure, UserBody } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';
interface Context {
  prisma: PrismaClient;
}

const resolvers = {
  GraphQLJSON,
  Mutation: {
    createUserHealthIssue: async (_parent: any, { userId, healthIssue }: { userId: string, healthIssue: Health }, context: Context) => {
      return await context.prisma.userHealthIssue.create({
        data: {
          userId,
          healthIssue,
        },
      });
    },
    updateUserHealthIssue: async (_parent: any, { id, userId, healthIssue }: { id: string, userId?: string, healthIssue?: Health }, context: Context) => {
      return await context.prisma.userHealthIssue.update({
        where: { id },
        data: { userId, healthIssue },
      });
    },
    deleteUserHealthIssue: async (_parent: any, { id }: { id: string }, context: Context) => {
      await context.prisma.userHealthIssue.delete({ where: { id } });
      return true;
    },









    createExercises: async (_parent: any, { Exercises }: { Exercises: { exerciseId: string, exerciseInstruction: string, exerciseIntensities: Intensities, levelId: string } }, context: Context) => {
      return await context.prisma.exercises.create({
        data: Exercises,
      });
    },
    
    updateExercises: async (_parent: any, { exerciseId, Exercises }: { exerciseId: string, Exercises?: { exerciseId: string, exerciseInstruction: string, exerciseIntensities: Intensities, levelId: string } }, context: Context) => {
      return await context.prisma.exercises.update({
        where: { exerciseId: exerciseId },
        data: {
          ...Exercises,
          exerciseId: undefined,  // We don't want to update the exerciseId
        },
      });
    },
    deleteExercises: async (_parent: any, { exerciseId }: { exerciseId: string }, context: Context) => {
      await context.prisma.exercises.delete({ where: { exerciseId: exerciseId } });
      return true;
    },







    createExerciseXMedia: async (_parent: any, { exerciseId, mediaUrl }: { exerciseId: string, mediaUrl: string }, context: Context) => {
      return await context.prisma.exerciseXMedia.create({
        data: {
          exerciseId,
          mediaUrl,
        },
      });
    },

    updateExerciseXMedia: async (_parent: any, { id, exerciseId, mediaUrl }: { id: string, exerciseId?: string, mediaUrl?: string }, context: Context) => {
      return await context.prisma.exerciseXMedia.update({
        where: { id },
        data: { exerciseId, mediaUrl },
      });
    },

    deleteExerciseXMedia: async (_parent: any, { id }: { id: string }, context: Context) => {
      await context.prisma.exerciseXMedia.delete({ where: { id } });
      return true;
    },



    

    createExerciseXMuscles: async (_parent: any, { exerciseId, muscleId }: { exerciseId: string, muscleId: string }, context: Context) => {
      return await context.prisma.exerciseXMuscles.create({
        data: {
          exerciseId,
          muscleId,
        },
      });
    },
    
    updateExerciseXMuscles: async (_parent: any, { id, exerciseId, muscleId }: { id: string, exerciseId?: string, muscleId?: string }, context: Context) => {
      return await context.prisma.exerciseXMuscles.update({
        where: { id },
        data: { exerciseId, muscleId },
      });
    },
    
    deleteExerciseXMuscles: async (_parent: any, { id }: { id: string }, context: Context) => {
      await context.prisma.exerciseXMuscles.delete({ where: { id } });
      return true;
    },






    createWorkoutSession: async (_parent: any, { weekPlanId, sessionData, healthIssues, currentDate }: { weekPlanId: string, sessionData: Prisma.JsonValue, healthIssues: Health, currentDate: Date }, context: Context) => {
      return await context.prisma.workoutSession.create({
        data: {
          weekPlanId,
          sessionData: sessionData as Prisma.InputJsonValue, // Use a type assertion
          healthIssues,
          currentDate,
        },
      });
    },
    
    updateWorkoutSession: async (_parent: any, { id, weekPlanId, sessionData, healthIssues, currentDate }: { id: string, weekPlanId?: string, sessionData?: Prisma.JsonValue, healthIssues?: Health, currentDate?: Date }, context: Context) => {
      return await context.prisma.workoutSession.update({
        where: { id },
        data: {
          weekPlanId,
          sessionData: sessionData as Prisma.InputJsonValue, // Use a type assertion
          healthIssues,
          currentDate,
        },
      });
    },
    
    deleteWorkoutSession: async (_parent: any, { id }: { id: string }, context: Context) => {
      await context.prisma.workoutSession.delete({ where: { id } });
      return true;
    },










    createWeekPlan: async (_parent: any, { programOwnerId, programUserId, infrastructureAvailability, programData, workoutSessions }: { programOwnerId: string, programUserId: string, infrastructureAvailability: Infrastructure, programData: Prisma.JsonValue, workoutSessions: { id: string; weekPlanId: string; sessionData: Prisma.JsonValue; healthIssues: Health; currentDate: Date; }[] }, context: Context) => {
  return await context.prisma.weekPlan.create({
    data: {
      programOwnerId,
      programUserId,
      infrastructureAvailability,
      programData: programData as Prisma.InputJsonValue,
      workoutSessions: {
        create: workoutSessions.map(session => ({ 
          id: session.id, 
          weekPlanId: session.weekPlanId, 
          sessionData: session.sessionData as Prisma.InputJsonValue, 
          healthIssues: session.healthIssues, 
          currentDate: session.currentDate 
        })) // Use the create operator for each WorkoutSession
      },
    },
  });
},

updateWeekPlan: async (_parent: any, { id, programOwnerId, programUserId, infrastructureAvailability, programData, workoutSessions }: { id: string, programOwnerId?: string, programUserId?: string, infrastructureAvailability?: Infrastructure, programData?: Prisma.JsonValue, workoutSessions?: { id: string; weekPlanId: string; sessionData: Prisma.JsonValue; healthIssues: Health; currentDate: Date; }[] }, context: Context) => {
  return await context.prisma.weekPlan.update({
    where: { id },
    data: {
      programOwnerId,
      programUserId,
      infrastructureAvailability,
      programData: programData as Prisma.InputJsonValue,
      workoutSessions: {
        create: workoutSessions?.map(session => ({ 
          id: session.id, 
          weekPlanId: session.weekPlanId, 
          sessionData: session.sessionData as Prisma.InputJsonValue, 
          healthIssues: session.healthIssues, 
          currentDate: session.currentDate 
        })) // Use the create operator for each WorkoutSession
      },
    },
  });
},
    
    deleteWeekPlan: async (_parent: any, { id }: { id: string }, context: Context) => {
      await context.prisma.weekPlan.delete({ where: { id } });
      return true;
    },















    createUserBody: async (_parent: any, args: { userId: string, bodyWeight: number }, context: Context) => {
      const { userId, bodyWeight } = args;
      return await context.prisma.userBody.create({
        data: {
          userId,
          bodyWeight,
        },
      });
    },
    updateUserBody: async (_parent: any, args: { id: string, userId?: string, bodyWeight: number }, context: Context) => {
      const { id, userId, bodyWeight } = args;
      return await context.prisma.userBody.update({
        where: { id },
        data: { userId, bodyWeight },
      });
    },
    deleteUserBody: async (_parent: any, args: { id: string }, context: Context) => {
      const { id } = args;
      await context.prisma.userBody.delete({ where: { id } });
      return true;
    },
  },
};

export default resolvers;