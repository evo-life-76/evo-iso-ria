import {NextResponse} from 'next/server';import {db} from '@/lib/db';import {requireSession} from '@/lib/auth';
export async function GET(){await requireSession();return NextResponse.json(await db.project.findMany({include:{_count:{select:{isometries:true}}},orderBy:{updatedAt:'desc'}}))}
export async function POST(req:Request){await requireSession();const b=await req.json();if(!b.name)return NextResponse.json({error:'Nom requis'},{status:400});return NextResponse.json(await db.project.create({data:{name:b.name,address:b.address||null,city:b.city||null,client:b.client||null}}))}
