import { Profile, SessionEntity, UserId } from '../_domain/types'
import { AuthorizatoinError } from '@/shared/lib/errors'
import { profileRepository } from '../_repositories/profile'
import { createProfileAbility } from '../_domain/ability'

type UpdateProfile = {
	userId: UserId
	data: Partial<Profile>
	session: SessionEntity
}

export class UpdateProfileService {
	async exec({ userId, session, data }: UpdateProfile): Promise<Profile> {
		const profileAbility = createProfileAbility(session)

		if (!profileAbility.canUpdateProfile(userId)) {
			throw new AuthorizatoinError()
		}

		return await profileRepository.update(userId, data)
	}
}

export const updateProfileService = new UpdateProfileService()
