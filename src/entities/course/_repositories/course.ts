import { cache } from 'react'
import { CourseEntity } from '../_domain/types'

import { fetchManifest } from '@/shared/api/content'

class CoursesRepository {
	getCoursesList = cache(async (): Promise<CourseEntity[]> => {
		const manifest = await fetchManifest()

		console.log(0, 'manifest', manifest)
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
