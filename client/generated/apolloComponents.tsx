export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type CreateStudentInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type Goal = {
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  trialsPerDay: Scalars["Float"];
  active: Scalars["Boolean"];
  completed: Scalars["Boolean"];
  studentId: Scalars["Float"];
  student: Student;
  trials: Array<Trial>;
};

export type Mutation = {
  createStudent: Student;
  changePassword?: Maybe<User>;
  confirmUser?: Maybe<Scalars["Boolean"]>;
  forgotPassword?: Maybe<Scalars["Boolean"]>;
  login?: Maybe<User>;
  logout: Scalars["Boolean"];
  register: User;
};

export type MutationCreateStudentArgs = {
  data: CreateStudentInput;
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
  me?: Maybe<User>;
  hello: Scalars["String"];
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
  success: Scalars["Boolean"];
  goalId: Scalars["Float"];
  goal: Goal;
};

export type User = {
  id: Scalars["ID"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  roles: Array<Scalars["String"]>;
  students?: Maybe<Array<Student>>;
};
export type ConfirmUserMutationVariables = {
  token: Scalars["String"];
};

export type ConfirmUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "confirmUser"
>;

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

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
