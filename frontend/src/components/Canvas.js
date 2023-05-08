import React, { useState, useEffect } from 'react'
import styles from './canvas.module.css'

import { useCanvasProvider } from '/logic/graphics'
 
export default function(props) {
	//This whole second component tree for canvas is pretty wanky - need to clean up
	const [ref, ready, dom] = useCanvasProvider(props.fps)

	//have to do a shallow copy of the children array here (for some reason)
	return <section className={styles.sect}>
		<div id="canvas_container" className={styles.container}>
		<canvas ref={ref} className={styles.canvas} width={props.width} height={props.height}/> 
		{ready && props.children}
		{[...dom]}
		</div>
	</section>
}

