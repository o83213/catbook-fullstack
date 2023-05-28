import { gql } from "@apollo/client";
import { CONVERSATION_FIENDS } from "../fragments/conversation.fragment";

export default gql`
  query Conversation($conversationId: String!) {
    conversation(conversationId: $conversationId) {
      ...ConversationFields
    }
  }
  ${CONVERSATION_FIENDS}
`;
