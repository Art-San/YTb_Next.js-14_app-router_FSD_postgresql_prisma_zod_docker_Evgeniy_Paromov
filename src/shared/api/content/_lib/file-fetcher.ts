export class FileFetcher {
	constructor(private authToken?: string) {}

	async fetchText(url: string) {
		console.log(1, url)
		const res = await fetch(url, {
			headers: {
				...(this.authToken
					? {
							Authorization: `Bearer ${this.authToken}`,
						}
					: {}),
			},
		}).then((res) => res.text())
		console.log(1.1, res)
		return res
	}
}
