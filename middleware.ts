import {NextRequest,NextResponse} from 'next/server';
export function middleware(req:NextRequest){const p=req.nextUrl.pathname; const isPublic=p==='/'||p.startsWith('/api/auth/login')||p.startsWith('/_next'); if(!isPublic&&!req.cookies.get('ria_session'))return NextResponse.redirect(new URL('/',req.url)); return NextResponse.next()}
export const config={matcher:['/((?!favicon.ico).*)']};
