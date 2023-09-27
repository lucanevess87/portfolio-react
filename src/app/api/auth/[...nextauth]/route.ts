import NextAuth from 'next-auth';

import { provider } from '@/api/auth/providers';
import { NEXTAUTH_SECRET } from '@/config';

const handler = NextAuth({
  providers: [provider],
  debug: true,
  secret: NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'dark',
  },
});

export { handler as GET, handler as POST };
