/* eslint-disable prettier/prettier */
import axiosInstance, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';

import { API_URL } from '@/config';
import { cookies, storage, nodeCookies } from '@/utils';

const config = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const unathenticatedInstance = axiosInstance.create(config);
const authenticatedInstance = axiosInstance.create(config);

unathenticatedInstance.interceptors.response.use(
  (response) => response?.data,
  (error: AxiosError) => Promise.reject(error),
);

authenticatedInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const statusError = error.response?.status;
    if (error.response) {
      if ((statusError !== 401 && statusError !== 403) || typeof window === 'undefined') {
        return Promise.reject(error);
      }

      return axiosInstance
        .post(`${API_URL}auth/refresh-token`, {
          refresh_token: cookies.getAccess(),
        })
        .then((response) => {
          cookies.setAccess(response.data?.access_token);
          if (error.response) {
            if (!error.response.config.headers) return;
            (
              error.response.config.headers as any
            ).Authorization = `Bearer ${response.data.access_token}`;
            return authenticatedInstance(error.response.config);
          }
        })
        .catch(() => {
          cookies.clearAccess();
          storage.clearUser();
          signOut({ callbackUrl: '/entrar' });
        });
    }
  },
);

const axiosObject = {
  unauthorized() {
    unathenticatedInstance.defaults.baseURL = API_URL;

    return unathenticatedInstance;
  },
  authorized(ctx?: any) {
    const accessToken = ctx ? nodeCookies(ctx).getAccess() : cookies.getAccess();

    authenticatedInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    authenticatedInstance.interceptors.request.use(
      function (config) {
        config.baseURL = API_URL;

        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
    return authenticatedInstance;
  },
};

export default axiosObject;