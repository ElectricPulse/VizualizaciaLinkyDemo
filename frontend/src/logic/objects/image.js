import Node from '/logic/primitives'

export default class extends Node {
	constructor(imageUrl, x, y, width, height) {
		super()
		const size = [width, height]
		const pos = [x, y]
		this.pos = pos
		this.size = size

		this.image = null
	
		fetch(imageUrl).then((res) => res.blob()).then((blob) => {
			//Creates url in the form of blob:http://<website-url>/<rand-id>
			const source = URL.createObjectURL(blob)
			this.image = new Image()
			this.image.src = source
		})
	}

	draw(context) {
		if(this.image === null)
			return

		context.drawImage(this.image, ...this.pos, ...this.size)
	}	
}
