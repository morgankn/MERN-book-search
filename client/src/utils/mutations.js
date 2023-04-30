import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($authors: String!, $description: String!, $password: String!) {
    addProfile(username: $name, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook($profileId: ID!, $skill: String!) {
    saveBook(profileId: $profileId, skill: $skill) {
    
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($profileId: ID!, $skill: String!) {
    removeBook(profileId: $profileId, skill: $skill) {
    
    }
  }
`;
