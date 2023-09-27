import NextAuth, { NextAuthOptions } from 'next-auth';

import { providers } from '@/api/auth/providers';
import { NEXTAUTH_SECRET } from '@/config';

export const OPTIONS: NextAuthOptions = {
  providers: [...providers],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: NEXTAUTH_SECRET,
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
