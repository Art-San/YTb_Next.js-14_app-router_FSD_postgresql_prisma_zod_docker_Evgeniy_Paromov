import { PrismaClient } from '@prisma/client'

export const dbClient = new PrismaClient()

// https://stackoverflow.com/questions/75197409/prisma-warn-10-instances#:~:text=%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BC%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%80%D0%B8%D0%B9-,1%20%D0%BE%D1%82%D0%B2%D0%B5%D1%82,-%D0%9E%D1%82%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BE%20%D0%BF%D0%BE%3A
// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const dbClient =
// 	globalForPrisma.prisma ||
// 	new PrismaClient({
// 		log: ['query'],
// 	})

// // console.log('process.env.NODE_ENV', process.env.NODE_ENV) // development
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = dbClient
