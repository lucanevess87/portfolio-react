import GitHubProvider from 'next-auth/providers/github';

import { GITHUB_ID, GITHUB_SECRET } from '@/config';

export const github = GitHubProvider({
  clientId: GITHUB_ID,
  clientSecret: GITHUB_SECRET,
});
