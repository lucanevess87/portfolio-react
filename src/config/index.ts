export const APP_NAME = 'personal-leap';

export const API_URL = '';
export const MOCK_API_URL = process.env.REACT_APP_MOCK_API_URL as string;

export const ENVIROMENT = process.env.NODE_ENV;
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

export const NEXTAUTH_SECRET = '6d7c7fb5b9ebe1ac449f7993359a88b2';
export const GITHUB_ID = 'ca5ade7d032539fffd89';
export const GITHUB__SECRET = '64de6bb1c98ad2294d169eda299e2a6c1b019a26';
