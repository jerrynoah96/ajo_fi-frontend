import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql';
import { GET_ALL_PURSES } from '@/graphql/queries';

export function usePurses() {
  return useQuery({
    queryKey: ['purses'],
    queryFn: async () => {
      const data = await graphqlClient.request(GET_ALL_PURSES);
      return data.purses;
    }
  });
} 