import {SignJWT,jwtVerify} from 'jose'; import {cookies} from 'next/headers';
const key=new TextEncoder().encode(process.env.AUTH_SECRET||'dev-secret-change-me');
export type Session={id:string;email:string;name:string;role:'ADMIN'|'USER'};
export async function signSession(s:Session){return new SignJWT(s).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(key)}
export async function getSession():Promise<Session|null>{const c=(await cookies()).get('ria_session')?.value;if(!c)return null;try{return (await jwtVerify(c,key)).payload as unknown as Session}catch{return null}}
export async function requireSession(){const s=await getSession();if(!s)throw new Error('UNAUTHORIZED');return s}
