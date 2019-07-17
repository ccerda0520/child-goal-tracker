import gql from 'graphql-tag';

export const updateGoalMutation = gql`
    mutation UpdateGoal($data: UpdateGoalInput!) {
        updateGoal(data: $data)
    }
`;
