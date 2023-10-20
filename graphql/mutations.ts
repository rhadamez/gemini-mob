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

export const UPDATE_TASK = gql`
  mutation($description: String, $done: boolean) {
    update(data: {
      description: $description
      done: $done
    }) {
      id
      description
      done
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation($id: number!) {
    delete(data: {
      id: $id
    })
  }
`;