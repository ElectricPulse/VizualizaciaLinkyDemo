import { Node } from "/logic/primitives";
import fetchSvg from "/util/fetchSvg";
import findProperty from "@lib/findProperty"
import getRange from '@lib/getRange'
import { getVectorAngle } from "/util/vector";
import { getContext } from '/logic/graphicsState'

export default class extends Node {
	constructor(svgUrl, pos, width, onReady) {
		super()

		this.pos = pos;
		this.width = width;
		this.image = null;
		this.svg = null;

		fetchSvg(svgUrl).then((svg) => {
			if (null === svg) {
				onReady(null)
				return 
			}

			this.svg = svg;
			const blob = new Blob([svg.outerHTML], {
				type: "image/svg+xml;charset=utf-8",
			});

			const url = URL.createObjectURL(blob);
			const image = new Image();

			image.onload = () => {
				this.image = image;
				this.aspect = image.height / image.width;
				this.length = 0;
				const paths = svg.querySelectorAll("path");

				for (const path of paths) {
					this.length += path.getTotalLength();
				}
			
				//doing this so that getNearestPoint works
				this.verticies = []
				this.d = 1	
				for(let i = 0; i <= this.length; i+=this.d) {
					const vertex = this.getPointAtLength(i)
					this.verticies.push(vertex)
				}
				onReady(this);
			};

			image.src = url;
		});
	}

	getNearestLengthToPoint(pos) {
		//This is absolutely inneficient -> for each check it iterates through ALL verticies
		let curVertex = 0
		let curVertexLen = null

		for(const [i, vertex] of this.verticies.entries()) {
			const dx = Math.pow(pos[0] - vertex[0], 2)
			const dy = Math.pow(pos[1] - vertex[1], 2)

			const vertexLen = Math.sqrt(dx + dy)
			if(vertexLen < curVertexLen || curVertexLen === null) {
				curVertexLen = vertexLen 
				curVertex = i
			}
		}

		return curVertex * this.d
	}

	getAngleAtLength(len) {
		//Precision of derivative
		const d = 0.001;

		//Take two measurments then derivate
		const posRel1 = len;
		const pos1 = this.getPointAtLength(posRel1);
		const posRel2 = posRel1 + d < 1 ? posRel1 + d : posRel1 - d;
		const pos2 = this.getPointAtLength(posRel2);
		return getVectorAngle(pos1, pos2);

	}

	getGlobalFromLocal(pos) {
		const { width, height } = this.svg.viewBox.baseVal
		const context = getContext()

		pos[0] = pos[0] / width * context.canvas.width + this.pos[0]
		pos[1] = pos[1] / height * context.canvas.height + this.pos[1]

		return pos
	}

	getPointAtLength(pathLength) {
		const paths = this.svg.querySelectorAll("path");

		let temp = 0, lastTemp = 0;

		if(pathLength > this.length)
			pathLength = this.length
		else if(pathLength < 0)
			pathLength = 0


		for (const path of paths) {
			temp += path.getTotalLength();

			if (temp >= pathLength) {
				const relative = pathLength - lastTemp;
				const _point = path.getPointAtLength(relative);
				const point = [_point.x, _point.y];
			
				const gbPoint = this.getGlobalFromLocal(point);
				return gbPoint
			}

			lastTemp = temp
		}
		return [0,0]
	}

	getPointAtFraction(pos) {
		if (pos > 1) pos = 1;
		if (pos < 0) pos = 0;

		const subPathLength = pos * this.length;
		return this.getPointAtLength(subPathLength)
	}
	draw(context) {
		if (this.image === null) return;
		
		if(this.width === null)
			this.width = context.canvas.width

		context.drawImage(
			this.image,
			...this.pos,
			this.width,
			this.aspect * this.width
		);
	}
}
