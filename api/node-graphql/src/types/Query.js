
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
module.exports = `
scalar GraphQLJSON
type Query {
    user(userId: ID!): User
    users: [User]
    getUserIssues(userId: ID!): [UserHealthIssue!]!
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
    exerciseXMedia(id: ID!): ExerciseXMedia
    exerciseXMedias: [ExerciseXMedia]
    exerciseXMuscle(id: ID!): ExerciseXMuscles
    exerciseXMuscles: [ExerciseXMuscles]
    weekPlan(programUserId: ID!): WeekPlan
    weekPlans: [WeekPlan]
    workoutSession(id: ID!): WorkoutSession
    workoutSessions: [WorkoutSession]
    userBody(id: ID!): UserBody
    userBodies: [UserBody]
    getAnalytics(weekplanId: ID!): [SessionsByDate!]

  
}
`;


