import { gql } from "@apollo/client";
import { MESSAGE_FIENDS } from "../fragments/message.fragment";
export default gql`
  query Messages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      ...MessageFields
    }
  }
  ${MESSAGE_FIENDS}
`;
