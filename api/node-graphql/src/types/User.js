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
scalar DateTime
type User {
    userId: ID!
    userBirthDate: DateTime!
    userInscriptionDate: DateTime!
    userSex: Sex!
    bodyHeight: Float
    healthIssue: [UserHealthIssue]
    ownedWeekPlans: [WeekPlan]
    userWeekPlans: [WeekPlan]
    userBody: [UserBody]
    userLvl: [Levels]
    userLevel: Int!
    userXp: Int!
    name: String!
    email: String!
    password: String!
    phoneNumber: String!
}
`;