import { privateConfig } from '@/shared/config/private'
import { FileFetcher } from './_lib/file-fetcher'
import { ContentParser } from './_lib/content-parser'
import {
	DummyCacheStrategy,
	ReactQueryCacheStrategy,
} from './_lib/cache-strategy'
import { ContentApi } from './_content-api'
// 1Ж24
const fileFetcher = new FileFetcher(privateConfig.CONTENT_TOKEN)

const contentParser = new ContentParser()
const reactQueryCacheStrategy = new ReactQueryCacheStrategy()
const dummyCacheStrategy = new DummyCacheStrategy()

// export const fetchManifest = async () => {
// 	const fetchData = async () => {
// 		console.log('fetch data')
// 		const text = await fileFetcher.fetchText(
// 			`${privateConfig.CONTENT_URL}/manifest.yaml`
// 		)
// 		return await contentParser.parse<Manifest>(text, manifestSchema)
// 	}
// 	return dummyCacheStrategy.fetch(['manifest'], fetchData)
// }

export const contentApi = new ContentApi(privateConfig.CONTENT_URL, {
	cacheStrategy: dummyCacheStrategy,
	contentParser,
	fileFetcher,
})
// export const contentApi = new ContentApi(privateConfig.CONTENT_URL, {
// 	cacheStrategy:
// 		process.env.NODE_ENV === 'development'
// 			? dummyCacheStrategy
// 			: reactQueryCacheStrategy,
// 	contentParser,
// 	fileFetcher,
// })
