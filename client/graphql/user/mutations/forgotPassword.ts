import { gql } from 'apollo-boost';

export const ForgotPasswordMutation = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;