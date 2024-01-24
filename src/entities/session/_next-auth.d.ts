// Переопределяет глобальные типы модуля
import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			name?: string
			email: string
			image?: string
		}
	}
	interface User {
		id: string
		email: string
		name?: string
		image?: string
	}
}

// после того как переопределили user в useSession(), поле email: string пошли делать вход выход
