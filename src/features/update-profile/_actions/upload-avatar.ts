'use server'
// 5:16:36
import { z } from 'zod'
import { AVATAR_FILE_KEY } from '../_constants'
import { BadRequest } from '@/shared/lib/errors'
import { fileStorage } from '@/shared/lib/file-storage'

const resultSchema = z.object({
	avatar: z.object({
		path: z.string(),
	}),
})

export const uploadAvatarAction = async (formData: FormData) => {
	// const file = formData.get('avatar')
	const file = formData.get(AVATAR_FILE_KEY)

	if (!(file instanceof File)) {
		throw new BadRequest()
	}

	const storedFile = await fileStorage.uploadImage(file, 'avatar')

	const result = resultSchema.parse({
		avatar: storedFile,
	})
	// console.log('uploadAvatarAction result', result)
	return result
}
