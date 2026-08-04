import {PrismaClient} from '@prisma/client'; import bcrypt from 'bcryptjs';
const prisma=new PrismaClient();
async function main(){const hash=await bcrypt.hash('Admin123!',12); await prisma.user.upsert({where:{email:'admin@ria.local'},update:{},create:{name:'Mathys',email:'admin@ria.local',passwordHash:hash,role:'ADMIN'}})}
main().finally(()=>prisma.$disconnect());
