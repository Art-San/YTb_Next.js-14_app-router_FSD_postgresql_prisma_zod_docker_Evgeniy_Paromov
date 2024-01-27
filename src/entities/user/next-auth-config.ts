import { AuthOptions } from 'next-auth'
import { useSession } from 'next-auth/react'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { dbClient } from '@/shared/lib/db'
import { compact } from 'lodash-es'
import { privateConfig } from '@/shared/config/private'

// const value = useSession()
// value.data?.user.

export const nextAuthConfig: AuthOptions = {
	adapter: PrismaAdapter(dbClient) as AuthOptions['adapter'], // https://authjs.dev/reference/adapter/prisma?_gl=1*1m9sfhn*_gcl_au*MTk3ODI0MzIwOS4xNzA1NzQ4NDM1LjQ0MjIxMzA2Ni4xNzA2MDc5NjEzLjE3MDYwNzk3Mjg.#:~:text=prisma%20%2D%2Dsave%2Ddev-,PrismaAdapter,-()%E2%80%8B
	pages: {
		signIn: '/auth/sign-in',
		newUser: '/auth/new-user',
		verifyRequest: '/auth/verify-request',
	},
	providers: compact([
		EmailProvider({
			// self-signed certificate in certificate chain -- самоподписанный сертификат в цепочке сертификатов
			server: {
				host: privateConfig.EMAIL_SERVER_HOST,
				port: privateConfig.EMAIL_SERVER_PORT,
				auth: {
					user: privateConfig.EMAIL_SERVER_USER,
					pass: privateConfig.EMAIL_SERVER_PASSWORD,
				},
			},
			from: privateConfig.EMAIL_FROM,
		}),
		privateConfig.GITHUB_ID &&
			privateConfig.GITHUB_SECRET &&
			GithubProvider({
				clientId: process.env.GITHUB_ID ?? '',
				clientSecret: process.env.GITHUB_SECRET || '',
			}),
	]),
}

// import { AuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import EmailProvider from "next-auth/providers/email";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { dbClient } from "@/shared/lib/db";
// import { compact } from "lodash-es";
// import { privateConfig } from "@/shared/config/private";
// import { createUserUseCase } from "./_use-cases/create-user";

// const prismaAdapter = PrismaAdapter(dbClient);

// const emailToken = privateConfig.TEST_EMAIL_TOKEN
//   ? {
//       generateVerificationToken: () => privateConfig.TEST_EMAIL_TOKEN ?? "",
//       sendVerificationRequest: () =>
//         console.log("we don't send emails in test mode"),
//     }
//   : {};

// export const nextAuthConfig: AuthOptions = {
//   adapter: {
//     ...prismaAdapter,
//     createUser: (user) => {
//       return createUserUseCase.exec(user);
//     },
//   } as AuthOptions["adapter"],
//   callbacks: {
//     session: async ({ session, user }) => {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: user.id,
//           role: user.role,
//         },
//       };
//     },
//   },
//   pages: {
//     signIn: "/auth/sign-in",
//     newUser: "/auth/new-user",
//     verifyRequest: "/auth/verify-request",
//   },
//   providers: compact([
//     EmailProvider({
//       ...emailToken,
//       server: {
//         host: privateConfig.EMAIL_SERVER_HOST,
//         port: privateConfig.EMAIL_SERVER_PORT,
//         auth: {
//           user: privateConfig.EMAIL_SERVER_USER,
//           pass: privateConfig.EMAIL_SERVER_PASSWORD,
//         },
//       },
//       from: privateConfig.EMAIL_FROM,
//     }),
//     privateConfig.GITHUB_ID &&
//       privateConfig.GITHUB_SECRET &&
//       GithubProvider({
//         clientId: privateConfig.GITHUB_ID,
//         clientSecret: privateConfig.GITHUB_SECRET,
//       }),
//   ]),
// };
