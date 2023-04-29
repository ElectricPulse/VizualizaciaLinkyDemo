import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import styles from './popup.module.css'

export default function main(props) {
	const [ vis, setVis ] = useState(false)
	const [ odozva, setOdozva ] = useState(false)

	const popupRef = useRef()
	if(props.vis != vis) {
		setVis(props.vis)
	}	

	useEffect(() => {
		setOdozva((prev) => !prev)	
	}, [vis])

	if(undefined != popupRef.current) {
		popupRef.current.style.left = props.x + "%"
		popupRef.current.style.top = props.y + "%"
	}

	const canvasContainer = document.getElementById('canvas_container')

	if(undefined == canvasContainer)
		return <></>

	return createPortal(<div data-visible={vis} ref={popupRef} className={styles.popup}>
			<div>
				Details Here:
				{props.children}
			</div>
		</div>,
		canvasContainer
	)

}
