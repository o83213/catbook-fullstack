import { gql } from "@apollo/client";
import { CONVERSATION_FIENDS } from "../fragments/conversation.fragment";
export default gql`
  subscription ConversationCreated {
    conversationCreated {
      conversation {
        ...ConversationFields
      }
    }
  }
  ${CONVERSATION_FIENDS}
`;
