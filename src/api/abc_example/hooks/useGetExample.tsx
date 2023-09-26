import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { getExample } from '..';

type UseGetCasesFn = (args?: {
  config?: AxiosRequestConfig;
}) => UseQueryResult<Awaited<ReturnType<typeof getExample>>>;

export const useGetExample: UseGetCasesFn = ({
  config,
}: {
  config?: AxiosRequestConfig;
} = {}) => {
  return useQuery({
    queryKey: ['examples'],
    queryFn: () => {
      return getExample({ config });
    },
  });
};
