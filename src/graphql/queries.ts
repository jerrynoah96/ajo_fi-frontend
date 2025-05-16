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