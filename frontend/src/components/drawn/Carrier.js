import React, { useState, useEffect, useRef } from 'react'
import Popup from '/components/Popup'
import conf from '/canvasConf.json'

//All classes that are drawn on the canvas should be imported with the prefix Can-
import CanvCarrier from './CanvCarrier.js'

export default function(props) {
	const [hover, setHover] = useState(false) 
	const [carrier, setCarrier] = useState(null)
	
	useEffect(() => {
		const transporter = new CanvCarrier(props.index, setHover, props.getTrans)
		transporter.pack()
		setCarrier(transporter)

		return () => transporter.unpack()
	}, [])
	
	return <>
	{ carrier &&
		<Popup vis={hover} x={carrier.pos[0]/conf.res} y={carrier.pos[1]/(conf.res * conf.aspect)}>
			<h3>Carrier ID: {props.carrierId}</h3>
			<h3>In sector: {props.sectorId}</h3>
		</Popup>
	}
	</>
}	
