const User = require('./User');
const UserHealthIssue = require('./UserHealthIssue');
const Levels = require('./Levels');
const Muscles = require('./Muscles');
const Equipements = require('./Equipements');
const Exercises = require('./Exercises');
const ExerciseXMedia = require('./ExerciseXMedia');
const ExercisXMuscles = require('./ExerciseXMuscles');
const WeekPlan = require('./WeekPlan');
const WorkoutSession = require('./WorkoutSession');
const UserBody = require('./UserBody');
const Mutation = require('./Mutation');
const Query = require('./Query');
const Instructions = require('./Instructions')
const { DateTimeResolver } = require('graphql-scalars');

module.exports = `
scalar GraphQLJSON
scalar DateTime


input UserInput {
    userBirthDate: DateTime!
    userInscriptionDate: DateTime
    userSex: Sex!
    bodyHeight: Float
    healthIssue: [UserHealthIssueInput]
    ownedWeekPlans: [WeekPlanInput]
    userWeekPlans: [WeekPlanInput]
    userBody: [UserBodyInput]
    userLvl: [LevelsInput]
    userLevel: Int
    userXp: Int
    name: String!
    email: String!
    password: String!
    phoneNumber: String!
}

input UserHealthIssueInput {
    
    userId: ID
    healthIssue: Health!
}

input LevelsInput {
    levelDescription: String
}

input MusclesInput {
    muscleDescription: String
}

input EquipementsInput {
    equipementDescription: String
    equipementPhotoUrl: String
}

input ExercisesInput {
    exerciseInstruction: String
    exerciseIntensities: Intensities
    levelId: String
}

input ExerciseXMediaInput {
    exerciseId: String
    mediaUrl: String
}

input ExerciseXMusclesInput {
    exerciseId: String
    muscleId: String
}

input WeekPlanInput {
    programOwnerId: String
    programUserId: String
    infrastructureAvailability: Infrastructure
    programData: GraphQLJSON
    dataProviding: GraphQLJSON
    userScaling:GraphQLJSON
}

input WorkoutSessionInput {
  weekPlanId: String
  sessionData: GraphQLJSON
  healthIssues: GraphQLJSON
  currentDate: String
}

input UserBodyInput {

    userId: String
    bodyWeight: Float
    measuringDate: String
}

type AuthPayload {
    token: String!
    user: User!
  }


type Mutation {

    login(email: String!, password: String!): AuthPayload!



    createUser(user: UserInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    deleteUser(userId: ID!): Boolean!

    createUserHealthIssue(userHealthIssue: UserHealthIssueInput!): UserHealthIssue!
    updateUserHealthIssue(id: ID!, userHealthIssue: UserHealthIssueInput!): UserHealthIssue!
    deleteUserHealthIssue(id: ID!): Boolean!

    createLevels(level: LevelsInput!): Levels!
    updateLevels(id: ID!, level: LevelsInput!): Levels!
    deleteLevels(levelId: ID!): Boolean!

    createMuscles(muscle: MusclesInput!): Muscles!
    updateMuscles(id: ID!, muscle: MusclesInput!): Muscles!
    deleteMuscles(muscleId: ID!): Boolean!

    createEquipements(equipement: EquipementsInput!): Equipements!
    updateEquipements(id: ID!, equipement: EquipementsInput!): Equipements!
    deleteEquipements(equipementId: ID!): Boolean!

    createExercises(exercise: ExercisesInput!): Exercises!
    updateExercises(id: ID!, exercise: ExercisesInput!): Exercises!
    deleteExercises(exerciseId: ID!): Boolean!

    createExerciseXMedia(exerciseXMedia: ExerciseXMediaInput!): ExerciseXMedia!
    updateExerciseXMedia(id: ID!, exerciseXMedia: ExerciseXMediaInput!): ExerciseXMedia!
    deleteExerciseXMedia(id: ID!): Boolean!

    createExerciseXMuscles(exerciseXMuscles: ExerciseXMusclesInput!): ExerciseXMuscles!
    updateExerciseXMuscles(id: ID!, exerciseXMuscles: ExerciseXMusclesInput!): ExerciseXMuscles!
    deleteExerciseXMuscles(id: ID!): Boolean!

    createWeekPlan(weekPlan: WeekPlanInput!): WeekPlan!
    updateWeekPlan(id: ID!, weekPlan: WeekPlanInput!): WeekPlan!
    deleteWeekPlan(id: ID!): Boolean!

    createWorkoutSession(workoutSession: WorkoutSessionInput!): WorkoutSession!
    updateWorkoutSession(id: ID!, workoutSession: WorkoutSessionInput!): WorkoutSession!
    deleteWorkoutSession(id: ID!): Boolean!

    createUserBody(userBody: UserBodyInput!): UserBody!
    updateUserBody(id: ID!,userBody: UserBodyInput!): UserBody!
    deleteUserBody(id: ID!): Boolean!
  
}
`;


