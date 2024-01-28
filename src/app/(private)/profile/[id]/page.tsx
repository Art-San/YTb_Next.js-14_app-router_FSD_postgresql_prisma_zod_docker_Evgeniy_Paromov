import { UpdateProfileForm } from '@/features/update-profile/update-profile-form'
import { Separator } from '@/shared/ui/separator'
// 3:19:31
export default function ProfilePage({ params }: { params: { id: string } }) {
	return (
		<main className="space-y-6 py-14 container  max-w-[600px]">
			<div>
				<h3 className="text-lg font-medium">Профиль</h3>
				<p className="text-sm text-muted-foreground">
					Это как другие пользователи видят вас на сайте
				</p>
			</div>
			<h1>Профиль</h1>
			<Separator />

			<UpdateProfileForm userId={params.id} />
		</main>
	)
}
// // import { UpdateProfileForm } from "@/features/update-profile/update-profile-form";
// import { Separator } from '@/shared/ui/separator'
// // 3:19:31
// export default function ProfilePage({ params }: { params: { id: string } }) {
// 	return (
// 		<main className="space-y-6 py-14 container  max-w-[600px]">
// 			<div>
// 				<h3 className="text-lg font-medium">Профиль</h3>
// 				<p className="text-sm text-muted-foreground">
// 					Это как другие пользователи видят вас на сайте
// 				</p>
// 			</div>
// 			<Separator />
// 			{/* <UpdateProfileForm userId={params.id} /> */}
// 		</main>
// 	)
// }
