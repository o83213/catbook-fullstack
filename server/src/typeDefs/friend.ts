export const FriendTypeDefs = `#graphql
  type Query {
    getUserfriends(userId: ID!): [User!]!
  }
  type Mutation {
    sendFriendRequest(addresseeId: String!): Boolean!
    acceptFriendRequest(requestorId: String!): Boolean!
    rejectFriendRequest(requestorId: String!): Boolean!
    deleteFriend(friendId: ID!): Boolean!
  }
`;
