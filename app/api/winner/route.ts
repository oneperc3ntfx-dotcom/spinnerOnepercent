import { prisma } from "@/lib/prisma";

export async function GET(){

 const setting =
 await prisma.setting.findFirst();

 if(setting?.forcedWinner){

  return Response.json({
   winner:setting.forcedWinner
  });

 }

 const participants =
 await prisma.participant.findMany();

 const random =
 participants[
  Math.floor(
   Math.random()*participants.length
  )
 ];

 return Response.json(random);
}
