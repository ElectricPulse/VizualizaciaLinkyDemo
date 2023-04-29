import { Node } from '/logic/primitives'

export default class extends Node {
	constructor(x, y, radius, fill) {
		super(() => {
			return {
				x1: this.x-this.radius,
				y1: this.y-this.radius,
				x2: this.x+this.radius,
				y2: this.y+this.radius
			}
		})
		this.radius = radius
		this._fill = fill
		this.fill = fill
		this.x = x
		this.y = y
	}

	draw(context) {
		context.fillStyle = this.fill
		context.beginPath()
			context.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
		context.fill()
	}
}

