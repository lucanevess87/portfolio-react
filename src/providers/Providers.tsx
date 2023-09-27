import { ReactNode } from 'react';

import NextAuthSession from './NextAuthSession';
import ReactQueryProvider from './ReactQueryProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <NextAuthSession>{children}</NextAuthSession>
    </ReactQueryProvider>
  );
};
