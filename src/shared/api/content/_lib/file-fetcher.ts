export class FileFetcher {
	constructor(private authToken?: string) {}

	async fetchText(url: string) {
		const res = await fetch(url, {
			headers: {
				...(this.authToken
					? {
							Authorization: `Bearer ${this.authToken}`,
						}
					: {}),
			},
		}).then((res) => res.text())

		return res
	}
}
