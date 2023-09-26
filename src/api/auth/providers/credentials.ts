import CredentialsProvider from 'next-auth/providers/credentials';

import axios from '@/lib/axios';

export type LoginResponse = {
  id: string;
  accessToken: string;
  user: User;
};

export type User = {
  version: number;
  id: string;
  username: string;
  refresh_token: {
    id: string;
    eat: string;
  };
  iat: number;
  exp: number;
};

export const credentials = CredentialsProvider({
  name: 'credentials',
  credentials: {
    identifier: { label: 'username', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials) => {
    if (credentials?.identifier) {
      try {
        const body = {
          username: credentials.identifier,
          password: credentials.password,
        };

        const loginResponse: LoginResponse = await axios.unauthorized().post('auth/login', body);

        if (!loginResponse.accessToken)
          throw new Error('Ocorreu um erro. Tente novamente mais tarde.');

        return {
          ...loginResponse,
        };
      } catch {
        throw new Error('Erro ao efetuar o login.');
      }
    }
    throw new Error('Falha na autenticação');
  },
});
