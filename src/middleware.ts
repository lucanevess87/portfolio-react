import { NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN_ID } from '@/config';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_ID);

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    NextResponse.next();
  }
}

export const config = {
  matcher: [], //private paths
};
