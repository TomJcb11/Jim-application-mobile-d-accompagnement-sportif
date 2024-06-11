import { gql } from '@apollo/client';

export const CREATE_WEEK_PLAN = gql`
    mutation Mutation($weekPlan: WeekPlanInput!) {
        createWeekPlan(weekPlan: $weekPlan) {
            dataProviding
            programUserId
            programOwnerId
        }
    }`;
