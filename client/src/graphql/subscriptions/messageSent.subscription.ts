import { gql } from "@apollo/client";
import { MESSAGE_FIENDS } from "../fragments/message.fragment";
export default gql`
  subscription MessageSent($conversationId: ID!) {
    messageSent(conversationId: $conversationId) {
      ...MessageFields
    }
  }
  ${MESSAGE_FIENDS}
`;
