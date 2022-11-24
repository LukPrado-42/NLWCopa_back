import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/primsa";
import { authenticate } from "../plugins/authenticate";

export async function poolRoutes(fastify: FastifyInstance) {
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()
        
        return { count }
    });

    fastify.post('/pools', async (request, reply) => {
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(request.body);

        const generate = new ShortUniqueId({  length: 6 });
        const code = String(generate()).toUpperCase();

        try {
            await request.jwtVerify()

            await prisma.pool.create({
                data: {
                    title,
                    code,
                    ownerId: request.user.sub,

                    participants: {
                        create: {
                            userId: request.user.sub,
                        }
                    }
                }
            })
        } catch {
            {
                console.log("error");
            }
        };

        return reply.status(201).send({ code })
        // return { title }
    });

    fastify.post('/pools/join',{
        onRequest: [ authenticate ]
    }, async (request, reply) => {
        const joinPoolBody = z.object({
            code: z.string(),
        });

        const { code } = joinPoolBody.parse(request.body);

        const pool = await prisma.pool.findUnique({
            where: {
                code,
            },
            include: {
                participants: {
                    where: {
                        userId: request.user.sub,
                    }
                }
            }
        });

        if(!pool) {
            return reply.status(400).send({
                message: "Pool not found."
            });
        };

        if(pool.participants.length > 0) {
            return reply.status(400).send({
                message: "You already joined this pool."
            });
        }

        if(!pool.ownerId) {
            await prisma.pool.update({
                where: {
                    id: pool.id,
                },
                data: {
                    ownerId: request.user.sub,
                }
            })
        }

        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: request.user.sub,
            }
        })

        return reply.status(201).send()
    });

    fastify.get('/pools', {
        onRequest: [ authenticate ]
    }, async (request) => {
        const pools = await prisma.pool.findMany({
            where: {
                participants: {
                    some: {
                        userId: request.user.sub,
                    }
                }
            },
            include: {
                _count: {
                    select:{
                        participants: true,
                    }
                },
                participants: {
                    select: {
                        id: true,

                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    },
                    take: 4,
                },
                owner:{
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })
        return { pools }
    });

    fastify.get('/pools/:id',{
        onRequest: [ authenticate ]
    }, async (request) => {
        const getPoolParams = z.object({
            id: z.string(),
        });

        const { id } = getPoolParams.parse(request.params);

        const pool = await prisma.pool.findUnique({
            where: {
                id,
            },
            include: {
                _count: {
                    select:{
                        participants: true,
                    }
                },
                participants: {
                    select: {
                        id: true,
                        guessPoints: true,

                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    }
                },
                owner:{
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        return { pool }
    });

    fastify.get('/pools/:poolId/participants', {
        onRequest: [ authenticate ]
    }, async (request) => {
        const getPoolParams = z.object({
            poolId: z.string(),
        });

        const { poolId } = getPoolParams.parse(request.params);
//!-----------------------------------------------------------  SE DER PROBLEMA NO RANKING, MUDAR ISSO
        const pool = await prisma.pool.findUnique({
            where: {
                id: poolId,
            },
            include: {
                participants:{
                    select: {
                        id: true,
                        guessPoints: true,
                    },
                    
                }
            }
        });

        const participants = pool?.participants.map((participant) => participant.id) || [""];

        const participantPoints = await Promise.all(participants.map( async (participant) => {
            const guess = await prisma.participant.findUnique({
                where: {
                    id: participant,
                },
                include: {

                    guesses: {
                        select: {
                            firstTeamPoints: true,
                            secondTeamPoints: true,

                            game: {
                                select: {
                                    firstTeamFinalScore: true,
                                    secondTeamFinalScore: true,
                                }
                            }
                        },
                        where: {
                            game :{
                                date: {
                                    lt: new Date(),
                                }
                            }
                        }
                    }
                }
            });

            const guessValidation = guess?.guesses.map((guess):number =>{
                    if(guess.firstTeamPoints === guess.game.firstTeamFinalScore 
                        && guess.secondTeamPoints === guess.game.secondTeamFinalScore) {
                        return 3
                    }
                    if(guess.game.firstTeamFinalScore === null || guess.game.secondTeamFinalScore === null) {
                        return 0
                    }
                    if((guess.firstTeamPoints > guess.secondTeamPoints 
                        && guess.game.firstTeamFinalScore > guess.game.secondTeamFinalScore)
                        ||(guess.firstTeamPoints < guess.secondTeamPoints 
                            && guess.game.firstTeamFinalScore < guess.game.secondTeamFinalScore)
                            ||(guess.firstTeamPoints === guess.secondTeamPoints 
                                && guess.game.firstTeamFinalScore === guess.game.secondTeamFinalScore) ){
                        return 1
                    }
                    return 0
            });

            const totalPoints = ( guessValidation?.length !== 0 ? guessValidation?.reduce((total, partial) => total + partial) : 0);
            return totalPoints
        }));

        console.log(participantPoints);

        participants.forEach( async (participant) => {
            const index = participants.indexOf(participant);
            console.log(index);

            try {
                
                await prisma.participant.update({
                        where: {
                                id: participant,
                            },
                            data: {
                                    guessPoints: participantPoints[index],
                                }
                            })
            } catch (error) {
                console.log(error);
            }
        });

//!---------------------------------------------------------
        const ranking = await prisma.participant.findMany({
            where: {
                poolId: poolId,
            },
            orderBy: {
                guessPoints: "desc",

            },
            include: {
                user:{
                    select:{
                        avatarUrl: true,
                        name: true,
                    }
                }
            }
        });

        return { 
            ranking:ranking.map(rank =>{
                return{
                    ...rank,
                }
            })
        };
    });
}
