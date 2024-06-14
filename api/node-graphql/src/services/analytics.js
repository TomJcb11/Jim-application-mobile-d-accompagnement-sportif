/*ici on veut récupérer de session data via prisma session data et current date de chaque workout

pour pouvoir exprimer:
date{
    biceps:{
        hammerCurl:15
        rowing:10
        bench:40
    }
}*/

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function getSessionDataAndDate() {
    return await prisma.workoutSession.findMany({
      select: {
        sessionData: true,
        currentDate: true
      },
      orderBy: {
        currentDate: 'asc'
      }
    });
  }
