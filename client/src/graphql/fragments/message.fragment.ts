import { gql } from "@apollo/client";
export const MESSAGE_FIENDS = gql`
  fragment MessageFields on Message {
    id
    sender {
      id
      name
    }
    body
    createdAt
  }
`;
