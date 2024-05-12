import AuthorizedGuard from '@/features/auth/authorized-guard'
import { AppHeader } from '../_widgets/app-header/app-header'

// 2:54:34 добавили AuthorizedGuard и перешли к новой части
export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<AppHeader variant="private" />
			<AuthorizedGuard>{children}</AuthorizedGuard>
		</>
	)
}
