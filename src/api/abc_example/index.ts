import { AxiosRequestConfig } from 'axios';

import axios from '@/lib/axios';

import { ExampleType } from './type';

export const getExample = ({
  config = {},
}: { config?: AxiosRequestConfig } = {}): Promise<ExampleType> => {
  return axios.authorized().get('/example', config);
};
