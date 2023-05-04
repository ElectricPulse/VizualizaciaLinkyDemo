import React, { useState, useEffect, useRef } from 'react'
import styles from './canvas.module.css'

import { useCanvas } from '/logic/graphics'

export default function(props) {
	const [ref, ready] = useCanvas(props.fps)

	useEffect(() => {
		if(props.width === undefined || props.height === undefined) {
			console.error("Canvas has undefined width or height")
			return
		}
	}, [])

	return <div id='canvas_container' className={styles.container}>
		<canvas ref={ref} width={props.width} height={props.height}/> 
		{ready && props.children}
	</div>
}

