import {pack, unpack, packDOM, unpackDOM, getContext} from '/logic/graphics'
import React, { useRef, useEffect } from 'react'

function Wrapper({style, Child}) {
	const ref = useRef()

	useEffect(() => {
		Object.assign(ref.current.style, style)
	}, [])

	return <div ref={ref}>
		<Child/>
	</div>
}

export class ComponentNode {
	constructor(el) {
		this.el = el
		this.id = Math.trunc(Math.random() * 1000)
		this.pos = [0, 0]
	}

	moveTo(pos) {
		this.pos = pos
	}

	pack() {
		const canvas = getContext().canvas
		const style = {
			left: this.pos[0]/canvas.width * 100 + "%",
			top: this.pos[1]/canvas.height * 100 + "%",
			//Inherit padding so that the canvas padding doesnt affect it
			position: 'absolute'
		}
		
		this.wrappedEl = <Wrapper key={this.id} Child={this.el} style={style}/>
		packDOM(this.wrappedEl)
	}

	unpack() {
		unpackDOM(this.wrappedEl)
	}
}

export class Node {
	constructor(getHover) {
		//BC as in bounding box coordinates
		this._getHover = getHover
	}
	
	//Init event has no use now, so it isnt working
	//These are the methods the user defined object should define 
	//initEvent() {}
	loopEvent() {}
	hoverEvent() {}

	_hoverHandler(mouse) {
		if(this._getHover === undefined)
			return

		const hover = this._getHover(mouse)		

		if(this._lastHover != hover) {
			this._hoverEvent(hover)
		}

		this._lastHover = hover
	}

	pack() {
		pack(this)
	}

	unpack() {
		unpack(this)
	}
}
