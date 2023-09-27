export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/vscode/:path*'], //private paths
};
