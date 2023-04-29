export default async function(path) {
	const parser = new DOMParser()
	const res = await fetch(path)

	if(res.status !== 200) {
		return null
	}

	const text = await res.text()
	const doc = parser.parseFromString(text, "image/svg+xml")

	return doc.documentElement
}
