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
    id: ID!
    userId: ID!
    healthIssue: Health!
}

input LevelsInput {
    levelId: ID!
    levelDescription: String
}

input MusclesInput {
    muscleId: ID!
    muscleDescription: String
}

input EquipementsInput {
    equipementId: ID!
    equipementDescription: String
    equipementPhotoUrl: String
}

input ExercisesInput {
    exerciseId: ID!
    exerciseInstruction: String
    exerciseIntensities: Intensities
    levelId: String
}

input ExerciseXMediaInput {
    id: ID!
    exerciseId: String
    mediaUrl: String
}

input ExerciseXMusclesInput {
    id: ID!
    exerciseId: String
    muscleId: String
}

input WeekPlanInput {
    id: ID!
    programOwnerId: String
    programUserId: String
    infrastructureAvailability: Infrastructure
    programData: GraphQLJSON
}

input WorkoutSessionInput {
    id: ID!
    weekPlanId: String
    sessionData: GraphQLJSON
    healthIssues: Health
    currentDate: String
}

input UserBodyInput {
    id: ID!
    userId: String
    bodyWeight: Float
    measuringDate: String
}
input ExercisesInput {
    exerciseId: ID!
    exerciseInstruction: String
    exerciseIntensities: Intensities
    levelId: String
}

input ExerciseXMediaInput {
    id: ID!
    exerciseId: String
    mediaUrl: String
}

input ExerciseXMusclesInput {
    id: ID!
    exerciseId: String
    muscleId: String
}

input WeekPlanInput {
    id: ID!
    programOwnerId: String
    programUserId: String
    infrastructureAvailability: Infrastructure
    programData: GraphQLJSON
}

input WorkoutSessionInput {
    id: ID!
    weekPlanId: String
    sessionData: GraphQLJSON
    healthIssues: Health
    currentDate: String
}

input UserBodyInput {
    id: ID!
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
    updateUser(user: UserInput!): User!
    deleteUser(userId: ID!): Boolean!

    createUserHealthIssue(userHealthIssue: UserHealthIssueInput!): UserHealthIssue!
    updateUserHealthIssue(userHealthIssue: UserHealthIssueInput!): UserHealthIssue!
    deleteUserHealthIssue(id: ID!): Boolean!

    createLevels(level: LevelsInput!): Levels!
    updateLevels(level: LevelsInput!): Levels!
    deleteLevels(levelId: ID!): Boolean!

    createMuscles(muscle: MusclesInput!): Muscles!
    updateMuscles(muscle: MusclesInput!): Muscles!
    deleteMuscles(muscleId: ID!): Boolean!

    createEquipements(equipement: EquipementsInput!): Equipements!
    updateEquipements(equipement: EquipementsInput!): Equipements!
    deleteEquipements(equipementId: ID!): Boolean!

    createExercises(exercise: ExercisesInput!): Exercises!
    updateExercises(exercise: ExercisesInput!): Exercises!
    deleteExercises(exerciseId: ID!): Boolean!

    createExerciseXMedia(exerciseXMedia: ExerciseXMediaInput!): ExerciseXMedia!
    updateExerciseXMedia(exerciseXMedia: ExerciseXMediaInput!): ExerciseXMedia!
    deleteExerciseXMedia(id: ID!): Boolean!

    createExerciseXMuscles(exerciseXMuscles: ExerciseXMusclesInput!): ExerciseXMuscles!
    updateExerciseXMuscles(exerciseXMuscles: ExerciseXMusclesInput!): ExerciseXMuscles!
    deleteExerciseXMuscles(id: ID!): Boolean!

    createWeekPlan(weekPlan: WeekPlanInput!): WeekPlan!
    updateWeekPlan(weekPlan: WeekPlanInput!): WeekPlan!
    deleteWeekPlan(id: ID!): Boolean!

    createWorkoutSession(workoutSession: WorkoutSessionInput!): WorkoutSession!
    updateWorkoutSession(workoutSession: WorkoutSessionInput!): WorkoutSession!
    deleteWorkoutSession(id: ID!): Boolean!

    createUserBody(userBody: UserBodyInput!): UserBody!
    updateUserBody(userBody: UserBodyInput!): UserBody!
    deleteUserBody(id: ID!): Boolean!
  
}
`;


