import { CoursesList } from '@/features/courses-list/pub/courses-list'
import { CreateCourseForm } from '@/features/courses-list/pub/create-course-form'
// 2:04:02
export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col  p-8">
			<h1 className="text-3xl mb-2">Courses</h1>
			<CreateCourseForm
				revalidatePagePath="/"
				className=" max-w-[300px] mb-5"
			/>
			<CoursesList revalidatePagePath="/" />
		</main>
	)
}
