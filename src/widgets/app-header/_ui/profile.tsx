'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { LogOut, User } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

import { useSignOut } from '@/features/auth/use-sign-out'
import { SignInButton } from '@/features/auth/sign-in-button'
// import { ProfileAvatar, getProfileDisplayName } from '@/entities/user/profile'

import { Skeleton } from '@/shared/ui/skeleton'

import { ProfileAvatar, getProfileDisplayName } from '@/entities/user/profile'
import { useAppSession } from '@/entities/user/_vm/use-app-session'
import { useRole } from '@/entities/user/_vm/use-role'

export function Profile() {
	const session = useAppSession()
	const { signOut, isPending: isLoadingSignOut } = useSignOut()
	console.log('Profile session', useRole())
	if (session.status === 'loading') {
		return <Skeleton className="w-8 h-8 rounded-full" />
	}

	if (session.status === 'unauthenticated') {
		return <SignInButton />
	}

	const user = session?.data?.user

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="p-px rounded-full self-center h-8 w-8"
				>
					<ProfileAvatar profile={user} className="h-8 w-8" />
					{/* <Avatar>
						<AvatarImage src={session?.data?.user?.image ?? undefined} />
						<AvatarFallback>AV</AvatarFallback>
					</Avatar> */}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 mr-2 ">
				<DropdownMenuLabel>
					<p>Мой аккаунт</p>
					<p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
						{user ? getProfileDisplayName(user) : undefined}
						{/* {session?.data?.user?.name} */}
					</p>
				</DropdownMenuLabel>
				<DropdownMenuGroup></DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={`/profile/1`}>
							<User className="mr-2 h-4 w-4" />
							<span>Профиль</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						disabled={isLoadingSignOut}
						onClick={() => signOut()}
					>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Выход</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
