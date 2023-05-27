import { Node } from '/logic/primitives'
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

function rotateVerticies(verticies, rot, pos) {
	const rotatedV = []
	for(const vertex of verticies)
		rotatedV.push(rotateVertexAroundOrigin(rot, vertex, pos))

	return rotatedV
}

function getVerticies(pos, rot, dimensions, fillet) {
	let verticies = generateFillet(pos, dimensions, fillet)
	verticies = rotateVerticies(verticies, rot, pos)
	return verticies
}

function rayCast(polygon, mouse) {
	let n = 0
	for(let i = 0; i < polygon.length; ++i) {
		const b = polygon[i]
		const a = polygon[i+1 === polygon.length ? 0: i+1]
		const slope = (mouse[1] - a[1]) / (b[1] - a[1])

		if((mouse[1] < a[1] !== mouse[1] < b[1]) && mouse[0] < a[0] + slope * (b[0] - a[0])) {
			++n;
		}

	}
	return n;
}

export default class extends Node {
	constructor(pos, size, rot, fill, fillet) {
		super((mouse) => !!(rayCast(this.polygon, mouse) % 2))

		this.hSize = [size[0]/2, size[1]/2]
		this.size = size
		this.currentFill = fill
		this.fill = fill
		this.rot = rot
		this.pos = pos
		this.fillet = fillet
	}
	
	_hoverEvent(hover) {
		this.currentFill = hover ? '#ff0000': this.fill
		this.hoverEvent(hover)
	}

	moveTo(pos) {
		this.pos = pos
	}

	rotateAt(rot) {
		this.rot = rot
	}

	draw(context) {
		this.polygon = getVerticies(this.pos, this.rot, this.size, this.fillet)
		if(this.pos === undefined)
			return

		context.fillStyle = this.currentFill
			
		context.beginPath()
		for(const vertex of this.polygon) {
			context.lineTo(...vertex)

		}
		context.fill()
	}
}

