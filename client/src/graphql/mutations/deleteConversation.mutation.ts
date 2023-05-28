import { gql } from "@apollo/client";
export default gql`
  mutation DeleteConversation($conversationId: String!) {
    deleteConversation(conversationId: $conversationId)
  }
`;
