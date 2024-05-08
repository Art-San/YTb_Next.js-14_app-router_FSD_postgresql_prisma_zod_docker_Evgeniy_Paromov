// import { cache } from 'react'
// import { CourseEntity } from '../_domain/types'

// import { contentApi } from '@/shared/api/content'

// class CoursesRepository {
// 	getCoursesList = cache(async (): Promise<CourseEntity[]> => {
// 		const manifest = await contentApi.fetchManifest()

// 		console.log(0, 'manifest', manifest)
// 		return [
// 			{
// 				id: '1234',
// 				slug: 'tup',
// 				description: 'description',
// 				title: 'title',
// 			},
// 		]
// 	})
// }

// export const coursesRepository = new CoursesRepository()

import { cache } from 'react'
import { CourseEntity } from '../_domain/types'
import { contentApi } from '@/shared/api/content'
// import { logger } from "@/shared/lib/logger";
class CoursesRepository {
	getCoursesList = cache(async (): Promise<CourseEntity[]> => {
		const manifest = await contentApi.fetchManifest()
		// console.log(5, 'manifest', manifest)

		const fetchCourse = async (courseSlug: string): Promise<CourseEntity> => {
			// console.log(5, courseSlug)
			// const course = await contentApi.fetchCourse('test-course-1')
			const course = await contentApi.fetchCourse(courseSlug)
			return {
				id: course.id,
				title: course.title,
				description: course.description,
				slug: courseSlug,
			}
		}

		const settledCourses = await Promise.allSettled(
			manifest.courses.map(fetchCourse)
		)

		settledCourses.forEach((value, i) => {
			if (value.status === 'rejected') {
				// logger.error({
				//   msg: "Course by slug not found",
				//   slug: manifest.courses[i],
				//   erorr: value.reason,
				// });
			}
		})

		const res = settledCourses
			.filter(
				(courseResult): courseResult is PromiseFulfilledResult<CourseEntity> =>
					courseResult.status === 'fulfilled'
			)
			.map((course) => {
				return course.value
			})

		return res
	})
}

export const coursesRepository = new CoursesRepository()
