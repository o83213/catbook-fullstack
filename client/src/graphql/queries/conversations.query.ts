import { gql } from "@apollo/client";
import { CONVERSATION_FIENDS } from "../fragments/conversation.fragment";

export default gql`
  query Conversations {
    conversations {
      ...ConversationFields
    }
  }
  ${CONVERSATION_FIENDS}
`;
