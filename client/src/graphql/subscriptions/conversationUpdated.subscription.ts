import { gql } from "@apollo/client";
import { CONVERSATION_FIENDS } from "../fragments/conversation.fragment";
export default gql`
  subscription ConversationUpdated {
    conversationUpdated {
      conversation {
        ...ConversationFields
      }
    }
  }
  ${CONVERSATION_FIENDS}
`;
