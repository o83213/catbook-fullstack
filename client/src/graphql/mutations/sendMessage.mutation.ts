import { gql } from "@apollo/client";

export default gql`
  mutation SendMessage(
    $id: String!
    $conversationId: String!
    $senderId: String!
    $body: String!
  ) {
    sendMessage(
      id: $id
      conversationId: $conversationId
      senderId: $senderId
      body: $body
    )
  }
`;
