const User = require('./types/User');
const UserHealthIssue = require('./types/UserHealthIssue');
const Levels = require('./types/Levels');
const Muscles = require('./types/Muscles');
const Equipements = require('./types/Equipements');
const Exercises = require('./types/Exercises');
const ExerciseXMedia = require('./types/ExerciseXMedia');
const ExerciseXMuscles = require('./types/ExerciseXMuscles');
const WeekPlan = require('./types/WeekPlan');
const WorkoutSession = require('./types/WorkoutSession');
const UserBody = require('./types/UserBody');
const Mutation = require('./types/Mutation');
const Query = require('./types/Query');
const Instructions =require('./types/Instructions')

const typeDefs = `
  ${User}
  ${UserHealthIssue}
  ${Levels}
  ${Muscles}
  ${Equipements}
  ${Exercises}
  ${ExerciseXMedia}
  ${ExerciseXMuscles}
  ${WeekPlan}
  ${WorkoutSession}
  ${UserBody}
  ${Mutation}
  ${Query}
  ${Instructions}

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
  }
  
  enum Kind {
    strength
    endurance
    flexibility
  }

  type Exercise {
  muscle: String
  name: String
  load: Int
}

type SessionsByDate {
  date: String
  analytics: [Exercise]
}
`;

module.exports = typeDefs;