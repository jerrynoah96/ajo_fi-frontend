import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { GET_VALIDATOR_DATA } from '@/graphql/queries';
import { ValidatorData } from '@/graphql/types';

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL || 'https://api.thegraph.com/subgraphs/name/your-subgraph';

export function useValidatorData(address: string | undefined) {
  return useQuery({
    queryKey: ['validatorData', address],
    queryFn: async () => {
      if (!address) return null;
      console.log('Fetching data for address:', address);
      const data = await request<ValidatorData>(
        SUBGRAPH_URL,
        GET_VALIDATOR_DATA,
        { owner: address.toLowerCase() }
      );
      console.log('Subgraph response:', data);
      return data.validators[0];
    },
    enabled: !!address,
  });
} 