import { AuthOptions } from 'next-auth'
import { useSession } from 'next-auth/react'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { dbClient } from '@/shared/lib/db'
import { compact } from 'lodash-es'
import { privateConfig } from '@/shared/config/private'
import { createUserUseCase } from './_use-cases/create-user'

const prismaAdapter = PrismaAdapter(dbClient)

const emailToken = privateConfig.TEST_EMAIL_TOKEN
	? {
			generateVerificationToken: () => privateConfig.TEST_EMAIL_TOKEN ?? '', // 5:57:00
			sendVerificationRequest: () =>
				console.log("we don't send emails in test mode"),
		}
	: {}

export const nextAuthConfig: AuthOptions = {
	adapter: {
		// отвечает за создание Юзера
		...prismaAdapter,
		createUser: (user) => {
			// перехват создания пользователя
			return createUserUseCase.exec(user)
		},
	} as AuthOptions['adapter'],
	// 2:36:00
	callbacks: {
		// этот callbacks управляет созданием session
		session: async ({ session, user }) => {
			return {
				...session,
				user: {
					...session.user,
					id: user.id,
					role: user.role,
				},
			}
		},
	},
	pages: {
		signIn: '/auth/sign-in',
		newUser: '/auth/new-user',
		verifyRequest: '/auth/verify-request',
	},
	providers: compact([
		EmailProvider({
			...emailToken,
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
