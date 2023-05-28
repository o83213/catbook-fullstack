export const UserTypeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name:  String!
    password: String!
    posts: [Post!]!
    comments: [Comment!]!
    profile: Profile!
    friendRequests: [String!]!
    likes: [Like!]!
    conversations: [Conversation!]!
  }

  type RegisterInput {
    email: String!
    password: String!
  }

  type LoginInput {
    email: String!
    password: String!
  }

  type ConfirmUserInput {
    id: ID!
    token: String!
  }

  type LoginResponse {
    accessToken: String!
  }

  type Query {
    getUsers(searchName: String): [User!]!
    getMe: User!
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): User!
    login(email: String!, password: String!): LoginResponse!
    logout: Boolean!
    confirmUser(id: ID!, token: String!): Boolean!
    forgotPassword(email: String!): Boolean!
    changePassword(id: ID!, token: String!, newPassword: String!): User!
    # updateUserFriendRequest(userId: ID!, friendId: ID!): User!
  }


`;
// export const UserTypeDefs = `#graphql
//   type User {
//     id: ID!
//     email: String!
//     password: String!
//     posts: [Post!]!
//     comments: [Comment!]!
//     profile: Profile!
//     friendRequests: [Int!]!
//     likes: [Like!]!
//     conversations: [Conversation!]!
//     messages: [Message!]!
//   }
// `;
