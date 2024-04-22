// schema.ts
import { gql } from 'graphql-tag';
import { GraphQLJSON } from 'graphql-type-json';

const schema = gql`
scalar GraphQLJSON

type User {
    userId: ID!
    userBirthDate: String!
    userInscriptionDate: String!
    userSex: Sex!
    bodyHeight: String
    healthIssue: [UserHealthIssue]
    ownedWeekPlans: [WeekPlan]
    userWeekPlans: [WeekPlan]
    userBody: [UserBody]
}

type UserHealthIssue {
    id: ID!
    user: User
    healthIssue: Health
}

type Levels {
    levelId: ID!
    levelDescription: String
    exercises: [Exercises]  
}

type Muscles {
    muscleId: ID!
    muscleDescription: String
    exerciseXMuscles: [ExerciseMuscles]
}

type Equipements {
    equipementId: ID!
    equipementDescription: String
    equipementPhotoUrl: String
}

type Exercises {
    exerciseId: ID!
    exerciseInstruction: String
    exerciseIntensities: Intensities
    levelId: String
    exerciseLevel: Levels
    exerciseXMedias: [ExerciseMedia]
    exerciseXMuscles: [ExerciseMuscles]
}

type ExerciseMedia {
    id: ID!
    exerciseId: String
    exercise: Exercises
    mediaUrl: String
}

type ExerciseMuscles {
    id: ID!
    exerciseId: String
    exercise: Exercises
    muscleId: String
    muscle: Muscles
}

type WeekPlan {
    id: ID!
    programOwnerId: String
    programOwner: User
    programUserId: String
    programUser: User
    infrastructureAvailability: Infrastructure
    programData: GraphQLJSON
    workoutSessions: [WorkoutSession]
}

type WorkoutSession {
    id: ID!
    weekPlanId: String
    weekPlan: WeekPlan
    sessionData: GraphQLJSON
    healthIssues: Health
    currentDate: String
}

type UserBody {
    id: ID!
    userId: String
    user: User
    bodyWeight: Float
    measuringDate: String
}

enum Sex {
    M
    F
    O
}

enum Intensities {
    low
    medium
    high
    super
}

enum Infrastructure {
    home
    gym
    outdoor
}

enum Health {
    none
    heart
    back
    rightArm
    leftArm
    rightLeg
    leftLeg
    muscleSoreness
}


type Mutation {
    createUser(userId: ID!, userBirthDate: String!, userInscriptionDate: String!, userSex: Sex!, bodyHeight: String): User!
    updateUser(userId: ID!, userBirthDate: String, userInscriptionDate: String, userSex: Sex, bodyHeight: String): User!
    deleteUser(userId: ID!): Boolean!
  
    createUserHealthIssue(id: ID!, userId: ID!, healthIssue: Health!): UserHealthIssue!
    updateUserHealthIssue(id: ID!, userId: ID, healthIssue: Health): UserHealthIssue!
    deleteUserHealthIssue(id: ID!): Boolean!
  
    createLevels(levelId: ID!, levelDescription: String): Levels!
    updateLevels(levelId: ID!, levelDescription: String): Levels!
    deleteLevels(levelId: ID!): Boolean!
  
    createMuscles(muscleId: ID!, muscleDescription: String): Muscles!
    updateMuscles(muscleId: ID!, muscleDescription: String): Muscles!
    deleteMuscles(muscleId: ID!): Boolean!
  
    createEquipements(equipementId: ID!, equipementDescription: String, equipementPhotoUrl: String): Equipements!
    updateEquipements(equipementId: ID!, equipementDescription: String, equipementPhotoUrl: String): Equipements!
    deleteEquipements(equipementId: ID!): Boolean!
  
    createExercises(exerciseId: ID!, exerciseInstruction: String, exerciseIntensities: Intensities, levelId: String): Exercises!
    updateExercises(exerciseId: ID!, exerciseInstruction: String, exerciseIntensities: Intensities, levelId: String): Exercises!
    deleteExercises(exerciseId: ID!): Boolean!
  
    createExerciseXMedia(id: ID!, exerciseId: String, mediaUrl: String): ExerciseMedia!
    updateExerciseXMedia(id: ID!, exerciseId: String, mediaUrl: String): ExerciseMedia!
    deleteExerciseXMedia(id: ID!): Boolean!
  
    createExerciseXMuscles(id: ID!, exerciseId: String, muscleId: String): ExerciseMuscles!
    updateExerciseXMuscles(id: ID!, exerciseId: String, muscleId: String): ExerciseMuscles!
    deleteExerciseXMuscles(id: ID!): Boolean!
  
    createWeekPlan(id: ID!, programOwnerId: String, programUserId: String, infrastructureAvailability: Infrastructure, programData: GraphQLJSON): WeekPlan!
    updateWeekPlan(id: ID!, programOwnerId: String, programUserId: String, infrastructureAvailability: Infrastructure, programData: GraphQLJSON): WeekPlan!
    deleteWeekPlan(id: ID!): Boolean!
  
    createWorkoutSession(id: ID!, weekPlanId: String, sessionData: GraphQLJSON, healthIssues: Health, currentDate: String): WorkoutSession!
    updateWorkoutSession(id: ID!, weekPlanId: String, sessionData: GraphQLJSON, healthIssues: Health, currentDate: String): WorkoutSession!
    deleteWorkoutSession(id: ID!): Boolean!
  
    createUserBody(id: ID!, userId: String, bodyWeight: Float, measuringDate: String): UserBody!
    updateUserBody(id: ID!, userId: String, bodyWeight: Float, measuringDate: String): UserBody!
    deleteUserBody(id: ID!): Boolean!
  }





  type Root {
  user(userId: ID!): User
  users: [User]
  userHealthIssue(id: ID!): UserHealthIssue
  userHealthIssues: [UserHealthIssue]
  level(levelId: ID!): Levels
  levels: [Levels]
  muscle(muscleId: ID!): Muscles
  muscles: [Muscles]
  equipement(equipementId: ID!): Equipements
  equipements: [Equipements]
  exercise(exerciseId: ID!): Exercises
  exercises: [Exercises]
  exerciseMedia(id: ID!): ExerciseMedia
  exerciseMedias: [ExerciseMedia]
  exerciseMuscle(id: ID!): ExerciseMuscles
  exerciseMuscles: [ExerciseMuscles]
  weekPlan(id: ID!): WeekPlan
  weekPlans: [WeekPlan]
  workoutSession(id: ID!): WorkoutSession
  workoutSessions: [WorkoutSession]
  userBody(id: ID!): UserBody
  userBodies: [UserBody]
}

schema {
  query: Root
  mutation: Mutation
}
`;
export default schema;