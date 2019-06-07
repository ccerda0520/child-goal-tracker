export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type CreateGoalInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  trialsPerDay: Scalars["Float"];
  category: Scalars["String"];
  studentId: Scalars["Float"];
};

export type CreateStudentInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type CreateTrialInput = {
  trialData: Array<Scalars["Boolean"]>;
  goalId: Scalars["Float"];
};

export type Goal = {
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  trialsPerDay: Scalars["Float"];
  category: Scalars["String"];
  active: Scalars["Boolean"];
  completed: Scalars["Boolean"];
  studentId: Scalars["Float"];
  student: Student;
  trials: Array<Trial>;
};

export type Mutation = {
  createGoal: Goal;
  createStudent: Student;
  createTrial: Trial;
  updateTrial: Trial;
  changePassword?: Maybe<User>;
  confirmUser?: Maybe<Scalars["Boolean"]>;
  forgotPassword?: Maybe<Scalars["Boolean"]>;
  login?: Maybe<User>;
  logout: Scalars["Boolean"];
  register: User;
};

export type MutationCreateGoalArgs = {
  data: CreateGoalInput;
};

export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
};

export type MutationCreateTrialArgs = {
  data: CreateTrialInput;
};

export type MutationUpdateTrialArgs = {
  data: UpdateTrialInput;
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type Query = {
  goals?: Maybe<Array<Goal>>;
  incompleteGoals?: Maybe<Array<Goal>>;
  currentTrial?: Maybe<Trial>;
  trial?: Maybe<Trial>;
  me?: Maybe<User>;
};

export type QueryGoalsArgs = {
  studentId: Scalars["Float"];
};

export type QueryIncompleteGoalsArgs = {
  studentId: Scalars["Float"];
};

export type QueryCurrentTrialArgs = {
  goalId: Scalars["Float"];
};

export type QueryTrialArgs = {
  goalId: Scalars["Float"];
};

export type RegisterInput = {
  password: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type Student = {
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  userId: Scalars["Float"];
  user: User;
  goals: Array<Goal>;
};

export type Trial = {
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  trialData: Array<Scalars["Boolean"]>;
  goalId: Scalars["Float"];
  goal: Goal;
};

export type UpdateTrialInput = {
  trialData: Array<Scalars["Boolean"]>;
  id: Scalars["Float"];
};

export type User = {
  id: Scalars["ID"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  roles: Array<Scalars["String"]>;
  students?: Maybe<Array<Student>>;
};
export type CreateGoalMutationVariables = {
  data: CreateGoalInput;
};

export type CreateGoalMutation = { __typename?: "Mutation" } & {
  createGoal: { __typename?: "Goal" } & Pick<
    Goal,
    "id" | "name" | "description" | "category"
  >;
};

export type GoalsQueryVariables = {
  studentId: Scalars["Float"];
};

export type GoalsQuery = { __typename?: "Query" } & {
  goals: Maybe<
    Array<
      { __typename?: "Goal" } & Pick<
        Goal,
        "id" | "name" | "description" | "category" | "trialsPerDay"
      >
    >
  >;
};

export type IncompleteGoalsQueryVariables = {
  studentId: Scalars["Float"];
};

export type IncompleteGoalsQuery = { __typename?: "Query" } & {
  goals: Maybe<
    Array<
      { __typename?: "Goal" } & Pick<
        Goal,
        "id" | "name" | "description" | "category" | "trialsPerDay"
      >
    >
  >;
};

export type CreateTrialMutationVariables = {
  data: CreateTrialInput;
};

export type CreateTrialMutation = { __typename?: "Mutation" } & {
  createTrial: { __typename?: "Trial" } & Pick<
    Trial,
    "id" | "trialData" | "createdAt"
  >;
};

export type CurrentTrialQueryVariables = {
  goalId: Scalars["Float"];
};

export type CurrentTrialQuery = { __typename?: "Query" } & {
  currentTrial: Maybe<
    { __typename?: "Trial" } & Pick<Trial, "id" | "trialData" | "createdAt">
  >;
};

export type UpdateTrialMutationVariables = {
  data: UpdateTrialInput;
};

export type UpdateTrialMutation = { __typename?: "Mutation" } & {
  updateTrial: { __typename?: "Trial" } & Pick<
    Trial,
    "id" | "trialData" | "createdAt"
  >;
};

export type ConfirmUserMutationVariables = {
  token: Scalars["String"];
};

export type ConfirmUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "confirmUser"
>;

export type CreateStudentMutationVariables = {
  data: CreateStudentInput;
};

export type CreateStudentMutation = { __typename?: "Mutation" } & {
  createStudent: { __typename?: "Student" } & Pick<
    Student,
    "firstName" | "lastName" | "id"
  >;
};

export type ForgotPasswordMutationVariables = {
  email: Scalars["String"];
};

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">>;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = {
  data: RegisterInput;
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & Pick<
    User,
    "id" | "firstName" | "lastName" | "email"
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & Pick<User, "email" | "id">>;
};

export type MeStudentsQueryVariables = {};

export type MeStudentsQuery = { __typename?: "Query" } & {
  me: Maybe<
    { __typename?: "User" } & Pick<User, "email" | "id"> & {
        students: Maybe<
          Array<
            { __typename?: "Student" } & Pick<
              Student,
              "firstName" | "lastName" | "id"
            >
          >
        >;
      }
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const CreateGoalDocument = gql`
  mutation CreateGoal($data: CreateGoalInput!) {
    createGoal(data: $data) {
      id
      name
      description
      category
    }
  }
`;
export type CreateGoalMutationFn = ReactApollo.MutationFn<
  CreateGoalMutation,
  CreateGoalMutationVariables
>;

export const CreateGoalComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        CreateGoalMutation,
        CreateGoalMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: CreateGoalMutationVariables }
) => (
  <ReactApollo.Mutation<CreateGoalMutation, CreateGoalMutationVariables>
    mutation={CreateGoalDocument}
    {...props}
  />
);

export type CreateGoalProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateGoalMutation, CreateGoalMutationVariables>
> &
  TChildProps;
export function withCreateGoal<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateGoalMutation,
    CreateGoalMutationVariables,
    CreateGoalProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    CreateGoalMutation,
    CreateGoalMutationVariables,
    CreateGoalProps<TChildProps>
  >(CreateGoalDocument, {
    alias: "withCreateGoal",
    ...operationOptions
  });
}

export function useCreateGoalMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateGoalMutation,
    CreateGoalMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateGoalMutation,
    CreateGoalMutationVariables
  >(CreateGoalDocument, baseOptions);
}
export const GoalsDocument = gql`
  query Goals($studentId: Float!) {
    goals(studentId: $studentId) {
      id
      name
      description
      category
      trialsPerDay
    }
  }
`;

export const GoalsComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<GoalsQuery, GoalsQueryVariables>, "query">,
    "variables"
  > & { variables: GoalsQueryVariables }
) => (
  <ReactApollo.Query<GoalsQuery, GoalsQueryVariables>
    query={GoalsDocument}
    {...props}
  />
);

export type GoalsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GoalsQuery, GoalsQueryVariables>
> &
  TChildProps;
export function withGoals<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GoalsQuery,
    GoalsQueryVariables,
    GoalsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GoalsQuery,
    GoalsQueryVariables,
    GoalsProps<TChildProps>
  >(GoalsDocument, {
    alias: "withGoals",
    ...operationOptions
  });
}

export function useGoalsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GoalsQueryVariables>
) {
  return ReactApolloHooks.useQuery<GoalsQuery, GoalsQueryVariables>(
    GoalsDocument,
    baseOptions
  );
}
export const IncompleteGoalsDocument = gql`
  query IncompleteGoals($studentId: Float!) {
    goals(studentId: $studentId) {
      id
      name
      description
      category
      trialsPerDay
    }
  }
`;

export const IncompleteGoalsComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        IncompleteGoalsQuery,
        IncompleteGoalsQueryVariables
      >,
      "query"
    >,
    "variables"
  > & { variables: IncompleteGoalsQueryVariables }
) => (
  <ReactApollo.Query<IncompleteGoalsQuery, IncompleteGoalsQueryVariables>
    query={IncompleteGoalsDocument}
    {...props}
  />
);

export type IncompleteGoalsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IncompleteGoalsQuery, IncompleteGoalsQueryVariables>
> &
  TChildProps;
export function withIncompleteGoals<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IncompleteGoalsQuery,
    IncompleteGoalsQueryVariables,
    IncompleteGoalsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IncompleteGoalsQuery,
    IncompleteGoalsQueryVariables,
    IncompleteGoalsProps<TChildProps>
  >(IncompleteGoalsDocument, {
    alias: "withIncompleteGoals",
    ...operationOptions
  });
}

export function useIncompleteGoalsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<IncompleteGoalsQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    IncompleteGoalsQuery,
    IncompleteGoalsQueryVariables
  >(IncompleteGoalsDocument, baseOptions);
}
export const CreateTrialDocument = gql`
  mutation CreateTrial($data: CreateTrialInput!) {
    createTrial(data: $data) {
      id
      trialData
      createdAt
    }
  }
`;
export type CreateTrialMutationFn = ReactApollo.MutationFn<
  CreateTrialMutation,
  CreateTrialMutationVariables
>;

export const CreateTrialComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        CreateTrialMutation,
        CreateTrialMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: CreateTrialMutationVariables }
) => (
  <ReactApollo.Mutation<CreateTrialMutation, CreateTrialMutationVariables>
    mutation={CreateTrialDocument}
    {...props}
  />
);

export type CreateTrialProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateTrialMutation, CreateTrialMutationVariables>
> &
  TChildProps;
export function withCreateTrial<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateTrialMutation,
    CreateTrialMutationVariables,
    CreateTrialProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    CreateTrialMutation,
    CreateTrialMutationVariables,
    CreateTrialProps<TChildProps>
  >(CreateTrialDocument, {
    alias: "withCreateTrial",
    ...operationOptions
  });
}

export function useCreateTrialMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateTrialMutation,
    CreateTrialMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateTrialMutation,
    CreateTrialMutationVariables
  >(CreateTrialDocument, baseOptions);
}
export const CurrentTrialDocument = gql`
  query CurrentTrial($goalId: Float!) {
    currentTrial(goalId: $goalId) {
      id
      trialData
      createdAt
    }
  }
`;

export const CurrentTrialComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<CurrentTrialQuery, CurrentTrialQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables: CurrentTrialQueryVariables }
) => (
  <ReactApollo.Query<CurrentTrialQuery, CurrentTrialQueryVariables>
    query={CurrentTrialDocument}
    {...props}
  />
);

export type CurrentTrialProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<CurrentTrialQuery, CurrentTrialQueryVariables>
> &
  TChildProps;
export function withCurrentTrial<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CurrentTrialQuery,
    CurrentTrialQueryVariables,
    CurrentTrialProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    CurrentTrialQuery,
    CurrentTrialQueryVariables,
    CurrentTrialProps<TChildProps>
  >(CurrentTrialDocument, {
    alias: "withCurrentTrial",
    ...operationOptions
  });
}

export function useCurrentTrialQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CurrentTrialQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    CurrentTrialQuery,
    CurrentTrialQueryVariables
  >(CurrentTrialDocument, baseOptions);
}
export const UpdateTrialDocument = gql`
  mutation UpdateTrial($data: UpdateTrialInput!) {
    updateTrial(data: $data) {
      id
      trialData
      createdAt
    }
  }
`;
export type UpdateTrialMutationFn = ReactApollo.MutationFn<
  UpdateTrialMutation,
  UpdateTrialMutationVariables
>;

export const UpdateTrialComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        UpdateTrialMutation,
        UpdateTrialMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: UpdateTrialMutationVariables }
) => (
  <ReactApollo.Mutation<UpdateTrialMutation, UpdateTrialMutationVariables>
    mutation={UpdateTrialDocument}
    {...props}
  />
);

export type UpdateTrialProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateTrialMutation, UpdateTrialMutationVariables>
> &
  TChildProps;
export function withUpdateTrial<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateTrialMutation,
    UpdateTrialMutationVariables,
    UpdateTrialProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateTrialMutation,
    UpdateTrialMutationVariables,
    UpdateTrialProps<TChildProps>
  >(UpdateTrialDocument, {
    alias: "withUpdateTrial",
    ...operationOptions
  });
}

export function useUpdateTrialMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateTrialMutation,
    UpdateTrialMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateTrialMutation,
    UpdateTrialMutationVariables
  >(UpdateTrialDocument, baseOptions);
}
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export type ConfirmUserMutationFn = ReactApollo.MutationFn<
  ConfirmUserMutation,
  ConfirmUserMutationVariables
>;

export const ConfirmUserComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        ConfirmUserMutation,
        ConfirmUserMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: ConfirmUserMutationVariables }
) => (
  <ReactApollo.Mutation<ConfirmUserMutation, ConfirmUserMutationVariables>
    mutation={ConfirmUserDocument}
    {...props}
  />
);

export type ConfirmUserProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<ConfirmUserMutation, ConfirmUserMutationVariables>
> &
  TChildProps;
export function withConfirmUser<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ConfirmUserMutation,
    ConfirmUserMutationVariables,
    ConfirmUserProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ConfirmUserMutation,
    ConfirmUserMutationVariables,
    ConfirmUserProps<TChildProps>
  >(ConfirmUserDocument, {
    alias: "withConfirmUser",
    ...operationOptions
  });
}

export function useConfirmUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ConfirmUserMutation,
    ConfirmUserMutationVariables
  >(ConfirmUserDocument, baseOptions);
}
export const CreateStudentDocument = gql`
  mutation CreateStudent($data: CreateStudentInput!) {
    createStudent(data: $data) {
      firstName
      lastName
      id
    }
  }
`;
export type CreateStudentMutationFn = ReactApollo.MutationFn<
  CreateStudentMutation,
  CreateStudentMutationVariables
>;

export const CreateStudentComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        CreateStudentMutation,
        CreateStudentMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: CreateStudentMutationVariables }
) => (
  <ReactApollo.Mutation<CreateStudentMutation, CreateStudentMutationVariables>
    mutation={CreateStudentDocument}
    {...props}
  />
);

export type CreateStudentProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateStudentMutation, CreateStudentMutationVariables>
> &
  TChildProps;
export function withCreateStudent<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    CreateStudentMutation,
    CreateStudentMutationVariables,
    CreateStudentProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    CreateStudentMutation,
    CreateStudentMutationVariables,
    CreateStudentProps<TChildProps>
  >(CreateStudentDocument, {
    alias: "withCreateStudent",
    ...operationOptions
  });
}

export function useCreateStudentMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateStudentMutation,
    CreateStudentMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateStudentMutation,
    CreateStudentMutationVariables
  >(CreateStudentDocument, baseOptions);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
export type ForgotPasswordMutationFn = ReactApollo.MutationFn<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

export const ForgotPasswordComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: ForgotPasswordMutationVariables }
) => (
  <ReactApollo.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>
    mutation={ForgotPasswordDocument}
    {...props}
  />
);

export type ForgotPasswordProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
> &
  TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >(ForgotPasswordDocument, {
    alias: "withForgotPassword",
    ...operationOptions
  });
}

export function useForgotPasswordMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;

export const LoginComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: LoginMutationVariables }
) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>;

export const LogoutComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LogoutMutation, LogoutMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: LogoutMutationVariables }
) => (
  <ReactApollo.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutMutationVariables>
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: "withLogout",
    ...operationOptions
  });
}

export function useLogoutMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;

export const RegisterComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: RegisterMutationVariables }
) => (
  <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
);

export type RegisterProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterMutationVariables>
> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: "withRegister",
    ...operationOptions
  });
}

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      email
      id
    }
  }
`;

export const MeComponent = (
  props: Omit<
    Omit<ReactApollo.QueryProps<MeQuery, MeQueryVariables>, "query">,
    "variables"
  > & { variables?: MeQueryVariables }
) => (
  <ReactApollo.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
);

export type MeProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeQuery, MeQueryVariables>
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, {
    alias: "withMe",
    ...operationOptions
  });
}

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export const MeStudentsDocument = gql`
  query MeStudents {
    me {
      email
      id
      students {
        firstName
        lastName
        id
      }
    }
  }
`;

export const MeStudentsComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<MeStudentsQuery, MeStudentsQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables?: MeStudentsQueryVariables }
) => (
  <ReactApollo.Query<MeStudentsQuery, MeStudentsQueryVariables>
    query={MeStudentsDocument}
    {...props}
  />
);

export type MeStudentsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeStudentsQuery, MeStudentsQueryVariables>
> &
  TChildProps;
export function withMeStudents<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    MeStudentsQuery,
    MeStudentsQueryVariables,
    MeStudentsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    MeStudentsQuery,
    MeStudentsQueryVariables,
    MeStudentsProps<TChildProps>
  >(MeStudentsDocument, {
    alias: "withMeStudents",
    ...operationOptions
  });
}

export function useMeStudentsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeStudentsQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeStudentsQuery, MeStudentsQueryVariables>(
    MeStudentsDocument,
    baseOptions
  );
}
