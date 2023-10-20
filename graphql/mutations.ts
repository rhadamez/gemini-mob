import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation($description: String!) {
    create(data: {
      description: $description
    }) {
      id
      description
      done
      createdAt
      updatedAt
    }
  }
`;