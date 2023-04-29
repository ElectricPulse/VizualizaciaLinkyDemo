import React, { useState, useEffect, useRef } from 'react'
import Popup from '/components/Popup'
import Rectangle from '/logic/objects/rectangle'

class Transporter extends Rectangle {
	constructor(id, setVis, getTrans) {
		super([0, 0], [30, 20], 0, "grey", 5)
		this.setVis = setVis
		this.id = id
		this.getTrans = getTrans
	}

	hoverEvent(state) {
		this.setVis(state)

		if(state)
			this.fill = 'blue'
		else
			this.fill = this._fill
	}

	loopEvent() {
		if(this.image === null)
			return

		const [ pos, rot ] = this.getTrans()
		this.pos = pos
		this.rot = rot
	}
}

export default function(props) {
	const [hover, setHover] = useState(false) 
	const transRef = useRef({x: 0, y: 0})
	
	useEffect(() => {
		const transporter = new Transporter(props.index, setHover, props.getTrans)
		transporter.pack()
		transRef.current = transporter

		return () => transporter.unpack()
	}, [])
	
	return <> {hover && <>
			<h1>Information about certain element here</h1>
			<h2>Transporter Index: {props.index}</h2>
			<h2>Current Sim Position: [{transRef.current.x}, {transRef.current.y}]</h2>

		</>
		} 

		<Popup vis={hover} x={transRef.current.x} y={transRef.current.y}>
			<h3>Transporter number: {props.index}</h3>
		</Popup>
	</>
o}	
