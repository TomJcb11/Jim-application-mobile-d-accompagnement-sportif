import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      email
      password
      name
      bodyHeight
      phoneNumber
      userBirthDate
      userInscriptionDate
      userSex
      userXp
      userLevel
      healthIssue {
        id
        healthIssue
      }
      userBody {
        bodyWeight
        id
        measuringDate
        userId
      }
    }
  }
`;