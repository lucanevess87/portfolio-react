import { Session } from 'next-auth';
import { ReactNode } from 'react';

import NextAuthSession from './NextAuthSession';
import ReactQueryProvider from './ReactQueryProvider';

export const Providers = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  return (
    <ReactQueryProvider>
      <NextAuthSession session={session}>{children}</NextAuthSession>
    </ReactQueryProvider>
  );
};
