import React, { useState, useEffect, useRef } from 'react'

import { startVis } from '/logic/graphics'

export default function(props) {
	const ref = useRef(null)
	const [initialized, setInitialized] = useState(false)

	useEffect(() => {
		if(props.fps === undefined) {
			console.error("Canvas has no FPS property")
			return
		}
		if(props.width === undefined || props.height === undefined) {
			console.error("Canvas has undefined width or height")
			return 
		}

		startVis(ref.current, props.fps)
		setInitialized(true)
	}, [])

	return <>
		<canvas ref={ref} className={props.className} width={props.width} height={props.height}/> 
		{initialized && props.children}
	</>
}

