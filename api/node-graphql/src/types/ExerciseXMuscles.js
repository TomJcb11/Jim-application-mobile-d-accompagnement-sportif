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
type ExerciseXMuscles {
    id: ID!
    exerciseId: String
    exercise: Exercises
    muscleId: String
    muscle: Muscles
}
`;