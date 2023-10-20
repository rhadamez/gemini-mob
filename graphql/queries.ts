import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    list {
      id
      description
      done
      createdAt
      updatedAt
    }
  }
`