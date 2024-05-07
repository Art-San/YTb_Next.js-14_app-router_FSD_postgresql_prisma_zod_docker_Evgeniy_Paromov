import { dbClient } from '@/shared/lib/db'
import { cache } from 'react'
import { CourseEntity } from '../_domain/types'
import { fileFetcher } from '@/shared/api/content'
import { privateConfig } from '@/shared/config/private'

class CoursesRepository {
	getCoursesList = cache(async (): Promise<CourseEntity[]> => {
		const text = await fileFetcher.fetchText(
			`${privateConfig.CONTENT_URL}/manifest.yaml`
		)

		console.log(0, text)
		return [
			{
				id: '1234',
				slug: 'tup',
				description: 'description',
				title: 'title',
			},
		]
	})
}

export const coursesRepository = new CoursesRepository()
// import { dbClient } from '@/shared/lib/db'
// import { cache } from 'react'
// class CoursesRepository {
// 	getCoursesList = cache(
// 		(): Promise<CourseListElement[]> => dbClient.course.findMany()
// 	)

// 	createCourseElement = (
// 		command: CreateCourseListElementCommand
// 	): Promise<CourseListElement> => {
// 		return dbClient.course.create({
// 			data: command,
// 		})
// 	}
// 	deleteCourseElement = (command: DeleteCourseListElementCommand) => {
// 		return dbClient.course.delete({
// 			where: { id: command.id },
// 		})
// 	}
// }

// export const coursesRepository = new CoursesRepository()
