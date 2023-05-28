export const MessageTypeDefs = `#graphql
  scalar Date
  type Message {
    id: String!
    sender: User!
    body: String!
    createdAt: Date!
  }

  type Query {
    messages(conversationId: ID!): [Message!]!
  }

  type Mutation {
    sendMessage(
      id: String!
      conversationId: String!
      senderId: String!
      body: String!
    ): Boolean!
  }

  type Subscription {
    messageSent(conversationId: ID!): Message
  }
`;
