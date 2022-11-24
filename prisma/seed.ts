import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const user1 = await prisma.user.create({
        data: {
          name: 'Diego',
          email: 'diego.doe@gmail.com',
          avatarUrl: 'https://github.com/diego3g.png',
        }
      });

    const user2 = await prisma.user.create({
        data: {
          name: 'Rodrigo',
          email: 'rodrigo.doe@gmail.com',
          avatarUrl: 'https://github.com/rodrigorgtic.png',
        }
      });

      const pool = await prisma.pool.create({
        data: {
          title: 'Example Pool',
          code: 'BOL123',
          ownerId: user1.id,
    
          participants: {
            create: {
              userId: user1.id,
            }
          }
        }
      });

      const participant2 = await prisma.participant.create({
        data: {
            userId: user2.id,
            poolId: pool.id,
        }
      })

    //----------------------------------PRIMEIRA RODADA
    await prisma.game.create({   
        data: {
            date: "2022-11-20T13:00:00.662Z",
            firstTeamCountryCode: "QA",
            secondTeamCountryCode: "EC",
            gameStage: "GRUPO A", 
            firstTeamFinalScore: 0,
            secondTeamFinalScore: 2,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-21T10:00:00.662Z",
            firstTeamCountryCode: "gb-eng",
            secondTeamCountryCode: "IR",
            gameStage: "GRUPO B",
            firstTeamFinalScore: 6,
            secondTeamFinalScore: 2,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-21T13:00:00.662Z",
            firstTeamCountryCode: "SN",
            secondTeamCountryCode: "NL",
            gameStage: "GRUPO A",
            firstTeamFinalScore: 0,
            secondTeamFinalScore: 2,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-21T16:00:00.662Z",
            firstTeamCountryCode: "US",
            secondTeamCountryCode: "gb-wls",
            gameStage: "GRUPO B",
            firstTeamFinalScore: 1,
            secondTeamFinalScore: 1,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-22T07:00:00.662Z",
            firstTeamCountryCode: "AR",
            secondTeamCountryCode: "SA",
            gameStage: "GRUPO C",
            firstTeamFinalScore: 1,
            secondTeamFinalScore: 2,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-22T10:00:00.662Z",
            firstTeamCountryCode: "DK",
            secondTeamCountryCode: "TN",
            gameStage: "GRUPO D",
            firstTeamFinalScore: 0,
            secondTeamFinalScore: 0,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-22T13:00:00.662Z",
            firstTeamCountryCode: "MX",
            secondTeamCountryCode: "PL",
            gameStage: "GRUPO C",
            firstTeamFinalScore: 0,
            secondTeamFinalScore: 0,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-22T16:00:00.662Z",
            firstTeamCountryCode: "FR",
            secondTeamCountryCode: "AU",
            gameStage: "GRUPO D",
            firstTeamFinalScore: 4,
            secondTeamFinalScore: 1,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-23T07:00:00.662Z",
            firstTeamCountryCode: "MA",
            secondTeamCountryCode: "HR",
            gameStage: "GRUPO F",
            firstTeamFinalScore: 0,
            secondTeamFinalScore: 0,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-23T10:00:00.662Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "JP",
            gameStage: "GRUPO E",
            firstTeamFinalScore: 1,
            secondTeamFinalScore: 2,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-23T13:00:00.662Z",
            firstTeamCountryCode: "ES",
            secondTeamCountryCode: "CR",
            gameStage: "GRUPO E",
            firstTeamFinalScore: 7,
            secondTeamFinalScore: 0,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-23T16:00:00.662Z",
            firstTeamCountryCode: "BE",
            secondTeamCountryCode: "CA",
            gameStage: "GRUPO F",
            firstTeamFinalScore: 1,
            secondTeamFinalScore: 0,
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-24T07:00:00.662Z",
            firstTeamCountryCode: "CH",
            secondTeamCountryCode: "CM",
            gameStage: "GRUPO G",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-24T10:00:00.662Z",
            firstTeamCountryCode: "UY",
            secondTeamCountryCode: "KR",
            gameStage: "GRUPO H",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-24T13:00:00.662Z",
            firstTeamCountryCode: "PT",
            secondTeamCountryCode: "GH",
            gameStage: "GRUPO H",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-24T16:00:00.662Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "RS",
            gameStage: "GRUPO G",
        }
    });

    //----------------------------------SEGUNDA RODADA
    await prisma.game.create({    
        data: {
            date: "2022-11-25T07:00:00.662Z",
            firstTeamCountryCode: "gb-wls",
            secondTeamCountryCode: "IR",
            gameStage: "GRUPO B",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-25T10:00:00.662Z",
            firstTeamCountryCode: "QA",
            secondTeamCountryCode: "SN",
            gameStage: "GRUPO A",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-25T13:00:00.662Z",
            firstTeamCountryCode: "NL",
            secondTeamCountryCode: "EC",
            gameStage: "GRUPO A",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-25T16:00:00.662Z",
            firstTeamCountryCode: "gb-eng",
            secondTeamCountryCode: "US",
            gameStage: "GRUPO B",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-26T07:00:00.662Z",
            firstTeamCountryCode: "TN",
            secondTeamCountryCode: "AU",
            gameStage: "GRUPO D",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-26T10:00:00.662Z",
            firstTeamCountryCode: "PL",
            secondTeamCountryCode: "SA",
            gameStage: "GRUPO C",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-26T13:00:00.662Z",
            firstTeamCountryCode: "FR",
            secondTeamCountryCode: "DK",
            gameStage: "GRUPO D",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-26T16:00:00.662Z",
            firstTeamCountryCode: "AR",
            secondTeamCountryCode: "MX",
            gameStage: "GRUPO C",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-27T07:00:00.662Z",
            firstTeamCountryCode: "JP",
            secondTeamCountryCode: "CR",
            gameStage: "GRUPO E",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-27T10:00:00.662Z",
            firstTeamCountryCode: "BE",
            secondTeamCountryCode: "MA",
            gameStage: "GRUPO F",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-27T13:00:00.662Z",
            firstTeamCountryCode: "HR",
            secondTeamCountryCode: "CA",
            gameStage: "GRUPO F",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-27T16:00:00.662Z",
            firstTeamCountryCode: "ES",
            secondTeamCountryCode: "DE",
            gameStage: "GRUPO E",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-28T07:00:00.662Z",
            firstTeamCountryCode: "CN",
            secondTeamCountryCode: "RS",
            gameStage: "GRUPO G",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-28T10:00:00.662Z",
            firstTeamCountryCode: "KR",
            secondTeamCountryCode: "GH",
            gameStage: "GRUPO H",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-28T13:00:00.662Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "CH",
            gameStage: "GRUPO G",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-28T16:00:00.662Z",
            firstTeamCountryCode: "PT",
            secondTeamCountryCode: "UY",
            gameStage: "GRUPO H",
        }
    });

    //----------------------------------TERCEIRA RODADA
    await prisma.game.create({    
        data: {
            date: "2022-11-29T12:00:00.662Z",
            firstTeamCountryCode: "NL",
            secondTeamCountryCode: "QA",
            gameStage: "GRUPO A",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-29T12:00:00.662Z",
            firstTeamCountryCode: "EC",
            secondTeamCountryCode: "SN",
            gameStage: "GRUPO A",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-29T16:00:00.662Z",
            firstTeamCountryCode: "gb-wls",
            secondTeamCountryCode: "gb-eng",
            gameStage: "GRUPO B",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-29T16:00:00.662Z",
            firstTeamCountryCode: "IR",
            secondTeamCountryCode: "US",
            gameStage: "GRUPO B",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-30T12:00:00.662Z",
            firstTeamCountryCode: "TN",
            secondTeamCountryCode: "FR",
            gameStage: "GRUPO D",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-30T12:00:00.662Z",
            firstTeamCountryCode: "AU",
            secondTeamCountryCode: "DK",
            gameStage: "GRUPO D",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-30T16:00:00.662Z",
            firstTeamCountryCode: "PL",
            secondTeamCountryCode: "AR",
            gameStage: "GRUPO C",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-11-30T16:00:00.662Z",
            firstTeamCountryCode: "SA",
            secondTeamCountryCode: "MX",
            gameStage: "GRUPO C",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-01T12:00:00.662Z",
            firstTeamCountryCode: "HR",
            secondTeamCountryCode: "BE",
            gameStage: "GRUPO F",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-01T12:00:00.662Z",
            firstTeamCountryCode: "CA",
            secondTeamCountryCode: "MA",
            gameStage: "GRUPO F",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-01T16:00:00.662Z",
            firstTeamCountryCode: "JP",
            secondTeamCountryCode: "ES",
            gameStage: "GRUPO E",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-01T16:00:00.662Z",
            firstTeamCountryCode: "CR",
            secondTeamCountryCode: "DE",
            gameStage: "GRUPO E",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-02T12:00:00.662Z",
            firstTeamCountryCode: "KR",
            secondTeamCountryCode: "PT",
            gameStage: "GRUPO H",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-02T12:00:00.662Z",
            firstTeamCountryCode: "GH",
            secondTeamCountryCode: "UY",
            gameStage: "GRUPO H",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-02T16:00:00.662Z",
            firstTeamCountryCode: "CM",
            secondTeamCountryCode: "BR",
            gameStage: "GRUPO G",
        }
    });
    await prisma.game.create({    
        data: {
            date: "2022-12-02T16:00:00.662Z",
            firstTeamCountryCode: "RS",
            secondTeamCountryCode: "CH",
            gameStage: "GRUPO G",
        }
    });

};

main();