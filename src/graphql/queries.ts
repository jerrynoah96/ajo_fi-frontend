import { gql } from 'graphql-request';

export const GET_VALIDATOR_DATA = gql`
  query GetValidatorData($owner: String!) {
    validators(where: { owner: $owner }) {
      id
      owner
      stakedToken {
        symbol
      }
      totalCreditsAssignedByValidator
      totalStakedAmount
      feePercentage
      userAssignments {
        user {
          id
          creditBalance
        }
      }
    }
  }
`;

export const GET_USER_VALIDATOR = gql`
  query GetUserValidator($userId: String!) {
    user(id: $userId) {
      validatorAssignments {
        validator {
          owner
        }
      }
    }
  }
`;

export const GET_ALL_PURSES = gql`
  query GetAllPurses {
    purses(first: 10) {
      id
      members {
        member {
          id
          validatorAssignments {
            amountAssigned
          }
        }
        id
        totalContributed
      }
      roundInterval
      totalPayoutsMade
    }
  }
`; 