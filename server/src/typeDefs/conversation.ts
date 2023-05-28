export const ConversationTypeDefs = `#graphql
  type Conversation {
    id: String!
    latestMessage: Message
    participants: [Participant!]!
    updatedAt: Date!
  }

  type Participant {
    id: String!
    user: User!
    hasSeenLatestMessage: Boolean!
  }

  type CreateConversationResponse {
    conversationId: String!
  }
  type ConversationCreatedSubscriptionPayload {
    conversation: Conversation!
  }
  type ConversationUpdatedSubscriptionPayload {
    conversation: Conversation!
  }
  type ConversationDeletedSubscriptionPayload {
    conversation: Conversation!
  }

  type Query {
    conversations: [Conversation!]!
    conversation(conversationId: String!): Conversation!
  }

  type Mutation {
    createConversation(participantsIds: [String!]!): CreateConversationResponse!
    markConversationAsRead(conversationId: String!): Boolean!
    deleteConversation(conversationId: String!): Boolean!
    updateParticipants(
      conversationId: String!
      participantIds: [String]!
    ): Boolean!
  }

  type Subscription {
    conversationCreated: ConversationCreatedSubscriptionPayload!
    conversationUpdated: ConversationUpdatedSubscriptionPayload!
    conversationDeleted: ConversationDeletedSubscriptionPayload!
  }
`;
