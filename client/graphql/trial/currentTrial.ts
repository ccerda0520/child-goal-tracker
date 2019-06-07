import { gql } from 'apollo-boost';

export const currentTrialQuery = gql`
    query CurrentTrial($goalId: Float!) {
        currentTrial(goalId: $goalId) {
            id
            trialData
            createdAt
        }
    }
`;
