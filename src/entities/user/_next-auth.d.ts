import NextAuth from 'next-auth'
import { SessionEntity, UserEntity } from './_domain/types'
// Изменение типов которые по умолчанию используются Next-auth
declare module 'next-auth' {
	interface Session {
		user: SessionEntity['user']
	}
	// interface Session extends SessionEntity {} // почему то не работает extends SessionEntity
	interface User extends UserEntity {}
}

// с начало были эти свои типы затем переделали через extends
// Переопределяет глобальные типы модуля
// import NextAuth from 'next-auth'

// declare module 'next-auth' {
// 	interface Session {
// 		user: {
// 			name?: string
// 			email: string
// 			image?: string
// 		}
// 	}
// 	interface User {
// 		id: string
// 		email: string
// 		name?: string
// 		image?: string
// 	}
// }

// после того как переопределили user в useSession(), поле email: string пошли делать вход выход
