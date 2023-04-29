import Node from '/logic/primitives'
import { rotateVertexAroundOrigin } from '/util/vertex'

function generateFillet([centerX, centerY], [width, height], fillet) {
	const hWidth = width/2 - fillet
	const hHeight = height/2 - fillet
	const corners = [[], [], [], []]

	for(let a = 0; a <= Math.PI/2; a += Math.PI/(2*fillet)) {
		const dx = Math.cos(a) * fillet + hWidth
		const dy = Math.sin(a) * fillet + hHeight
		
		corners[0].push([dx+centerX, dy+centerY])
		corners[1].push([dx+centerX, -dy+centerY])
		corners[2].push([-dx+centerX, -dy+centerY])
		corners[3].push([-dx+centerX, dy+centerY])
	}

	 return corners[0].reverse().concat(corners[1], corners[2].reverse(), corners[3])
}

export default class extends Node {
	constructor(pos, size, rot, fill, fillet) {
		super(() => [
			this.x-this.hSize[0],
			this.y-this.hSize[1],
			this.x+this.hSize[0],
			this.y+this.hSize[1]
		])

		this.hSize = [size[0]/2, size[1]/2]
		this.size = size
		this.currentFill = fill
		this.fill = fill
		this.rot = rot
		this.pos = pos
		this.fillet = fillet
	}
	
	hoverEvent(hover) {
		this.currentFill = hover ? '#ff0000': this.fill
	}

	moveTo(pos) {
		this.pos = pos
	}

	rotateAt(angle) {
		this.angle = angle
	}	

	draw(context) {
		if(this.pos === undefined)
			return

		const verticies = generateFillet(this.pos, this.size, this.fillet)

		context.fillStyle = this.currentFill
			
		context.beginPath()
		for(const vertex of verticies) {
			const rotatedVertex = rotateVertexAroundOrigin(this.rot, vertex, this.pos)
			context.lineTo(...rotatedVertex)

		}
		context.fill()
	}
}

