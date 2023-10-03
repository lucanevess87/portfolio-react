export const APP_NAME = 'vscode-luca';

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const GITHUB_ID = process.env.NEXT_PUBLIC_GITHUB_ID as string;
export const GITHUB_SECRET = process.env.NEXT_PUBLIC_GITHUB_SECRET as string;
export const NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
export const NEXTAUTH_SECRET = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET as string;
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;
export const ENVIRONMENT = process.env.NODE_ENV as string;
export const MOCK_ENABLED = process.env.NEXT_PUBLIC_API_MOCKING as string;

export const DEFAULT_PUBLIC_PAGE = '/login';
export const DEFAULT_PRIVATE_PAGE = '/';

export const ACCESS_TOKEN_ID = 'personal-leap_access';
export const REFRESH_TOKEN_ID = 'personal-leap_refresh';
export const USER_INFO_ID = 'personal-leap_user-info';

export const MSW_DB = 'personal-leap_msw-db';

export const JWT_ACCESS_SECRET = '123456' as string;
export const JWT_ACCESS_EXPIRES_IN = 10;
export const JWT_REFRESH_SECRET = '123456789' as string;
export const JWT_REFRESH_EXPIRES_IN = 50;

export const IS_CLIENT_SERVER = typeof window !== 'undefined';
