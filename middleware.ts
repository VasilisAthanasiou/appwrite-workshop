import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getSession } from './cloud/server/actions';
import { createSessionClient } from './cloud/server/appwrite';


export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // Headers
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        }
    })
    const user = await getSession();
    
    if ( !user ) {  // If the user is not authenticated
        response.cookies.delete(process.env.NEXT_APPWRITE_SESSION_COOKIE!);  // Make sure there is no session cookie if the user is not logged in
        if (pathname === '/account/reset-pw') {  // Reset password flow
            const userId = request.nextUrl.searchParams.get('userId');
            const secret = request.nextUrl.searchParams.get('secret');
            if (userId && secret) {
                const { account } = await createSessionClient();
                response.cookies.set(process.env.NEXT_APPWRITE_SESSION_COOKIE!, secret);
            } else {
                response.cookies.delete(process.env.NEXT_APPWRITE_SESSION_COOKIE!)
                response = NextResponse.redirect(new URL('/authentication/login', request.url));
            } // Reset password flow ends
        } else if (!pathname.startsWith('/authentication/')) {
            response = NextResponse.redirect(new URL('/authentication/login', request.url));
        }
    } else { // If the user is authenticated
        if (pathname.startsWith('/authentication/')) {
            response = NextResponse.redirect(new URL('/', request.url));
        }
    }
    return (response);
}

export const config = {
    matcher: ['/((?!api|static|favicon.ico|_next).*)', '/', '/authentication/:path*'] // <---- Add protected routes here
};
