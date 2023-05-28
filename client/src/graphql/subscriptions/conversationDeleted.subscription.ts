import { gql } from "@apollo/client";

export default gql`
  subscription ConversationDeleted {
    conversationDeleted {
      conversation {
        id
      }
    }
  }
`;
