import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies';

import { ACCESS_TOKEN_ID, REFRESH_TOKEN_ID } from '@/config';

export const cookies = {
  getAccess: () => {
    const cookiesObj = parseCookies();
    return cookiesObj[ACCESS_TOKEN_ID];
  },
  setAccess: (accessToken: string) => setCookie(null, ACCESS_TOKEN_ID, accessToken),
  clearAccess: () => destroyCookie(null, ACCESS_TOKEN_ID),
  getRefresh: () => {
    const cookiesObj = parseCookies();
    return cookiesObj[REFRESH_TOKEN_ID];
  },
  setRefresh: (refreshToken: string) => setCookie(undefined, REFRESH_TOKEN_ID, refreshToken),
  clearRefresh: () => destroyCookie(null, REFRESH_TOKEN_ID),
};

export const nodeCookies = (contextNode: any) => {
  const nodeCookiesObj = nookies.get(contextNode);

  return {
    getAccess: () => nodeCookiesObj[ACCESS_TOKEN_ID],
    setAccess: (accessToken: string) => setCookie(undefined, ACCESS_TOKEN_ID, accessToken),
    clearAccess: () => destroyCookie(null, ACCESS_TOKEN_ID),
    getRefresh: () => nodeCookiesObj[REFRESH_TOKEN_ID],
    setRefresh: (refreshToken: string) => setCookie(undefined, REFRESH_TOKEN_ID, refreshToken),
    clearRefresh: () => destroyCookie(null, REFRESH_TOKEN_ID),
  };
};
