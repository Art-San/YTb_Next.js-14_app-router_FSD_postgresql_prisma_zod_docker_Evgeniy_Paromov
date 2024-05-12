import { AuthorizatoinError } from '@/shared/lib/errors'

import { createUserAbility } from '../_domain/ability'
import { userRepository } from '../_repositories/user'
import { SharedSession, SharedUser, UserId } from '@/kernel/domain/user'

type GetUser = {
	userId: UserId
	session: SharedSession
}

export class GetUserService {
	async exec({ userId, session }: GetUser): Promise<SharedUser> {
		const userAbility = createUserAbility(session)

		if (!userAbility.canGetUser(userId)) {
			throw new AuthorizatoinError()
		}
		return await userRepository.getUserById(userId)
	}
}

export const getUserService = new GetUserService()
