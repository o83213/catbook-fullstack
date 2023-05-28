import { gql } from "@apollo/client";
import { MESSAGE_FIENDS } from "./message.fragment";
export const CONVERSATION_FIENDS = gql`
  fragment ConversationFields on Conversation {
    id
    updatedAt
    participants {
      user {
        id
        name
      }
      hasSeenLatestMessage
    }
    latestMessage {
      ...MessageFields
    }
  }
  ${MESSAGE_FIENDS}
`;
