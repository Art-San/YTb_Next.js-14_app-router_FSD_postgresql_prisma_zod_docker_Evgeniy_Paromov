import { dbClient } from '@/shared/lib/db'
import { UserEntity, UserId } from '../_domain/types'

export class UserRepository {
	async createUser(user: UserEntity) {
		await dbClient.user.create({
			data: user,
		})
	}
}

export const userRepository = new UserRepository()
