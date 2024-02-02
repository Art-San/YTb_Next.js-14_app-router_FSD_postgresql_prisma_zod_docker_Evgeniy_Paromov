import { selectFile, validateFileSize } from '@/shared/lib/file'
import { useMutation } from '@tanstack/react-query'
import { AVATAR_FILE_KEY, AVATAR_MAX_SIZE } from '../_constants'
import { uploadAvatarAction } from '../_actions/upload-avatar'

export const useUploadAvatar = ({
	onError,
	onSuccess,
}: {
	onError?: (type?: 'big-size') => void
	onSuccess?: (avatarPath: string) => void
}) => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: uploadAvatarAction,
		onSuccess(data) {
			// 5:40:00-5:47:00 рассказывает про ошибки
			console.log('data.avatar.path', data.avatar.path) // 5:34:53 string /storage/images/avatar-1706857087373-sportivnyj-bmw.jpg
			onSuccess?.(data.avatar.path)
		},
	})

	const handleFileSelect = async () => {
		const file = await selectFile('image/*')

		if (!validateFileSize(file, AVATAR_MAX_SIZE)) {
			return onError?.('big-size')
		}

		const formData = new FormData()

		formData.set(AVATAR_FILE_KEY, file)

		await mutateAsync(formData)
	}

	return {
		isPending,
		handleFileSelect,
	}
}
