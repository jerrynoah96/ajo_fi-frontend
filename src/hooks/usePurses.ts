import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { GET_ALL_PURSES } from '@/graphql/queries';

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL as string;

interface PurseMember {
  member: {
    id: string;
    validatorAssignments: {
      amountAssigned: string;
    }[];
  };
  id: string;
  totalContributed: string;
}

interface Purse {
  id: string;
  members: PurseMember[];
  roundInterval: string;
  totalPayoutsMade: string;
}

interface PursesResponse {
  purses: Purse[];
}

export function usePurses() {
  return useQuery({
    queryKey: ['purses'],
    queryFn: async () => {
      const data = await request<PursesResponse>(
        SUBGRAPH_URL,
        GET_ALL_PURSES
      );
      return data.purses;
    }
  });
} 