import { gql } from "@apollo/client";
export default gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  }
`;
