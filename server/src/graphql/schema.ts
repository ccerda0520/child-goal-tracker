import {gql} from 'apollo-server-express';

const schema = gql`
  type Query {
    me: User
    user(id: Int!): User!
    users: [User!]!
    student(id: Int!): Student!
    students: [Student!]!
    goal(id: Int!): Goal!
    goals: [Goal!]!
    trial(id: Int!): Trial!
    trials: [Trial!]!
  }
  
  type Mutation {
    createUser(username: String!, email: String!, firstName: String, lastName: String, password: String!): User!
    updateUser(id: Int!, username: String, email: String, firstName: String, lastName: String, password: String): Boolean
    deleteUser(id: Int!): Boolean
    createStudent(firstName: String!, lastName: String!, userId: Int!): Student!
    updateStudent(firstName: String!, lastName: String!): Boolean
    deleteStudent(id: Int!): Boolean
    createGoal(name: String!, description: String!, trialsPerDay: Int!, studentId: Int): Goal!
    updateGoal(name: String!, description: String!, trialsPerDay: Int!): Boolean
    deleteGoal(id: Int!): Boolean
    createTrial(goalId: Int!, success: Boolean): Trial!
    updateTrial(id: Int!, success: Boolean): Boolean
    deleteTrial(id: Int!): Boolean
    register(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): String!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    firstName: String
    lastName: String
    students: [Student!]
    roles: [String]
  }
  
  type Student {
    id: Int!
    firstName: String!
    lastName: String!
    user: User!
    userId: Int!
    goals: [Goal!]
  }
  
  type Goal {
    id: Int!
    name: String!
    description: String!
    trialsPerDay: Int!
    active: Boolean
    completed: Boolean
    student: Student!
    studentId: Int!
    trials: [Trial!]
  }
  
  type Trial {
    id: Int!
    success: Boolean
    goalId: Int!
    goal: Goal!
  }
`;

export default schema;