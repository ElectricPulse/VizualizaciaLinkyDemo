import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import styles from './popup.module.css'

export default function main(props) {
	const [ vis, setVis ] = useState(false)

	const popupRef = useRef()

	if(vis !== props.vis)
		setVis(props.vis)

	if(undefined !== popupRef.current) {
		popupRef.current.style.left = props.x*100 + "%"
		popupRef.current.style.top = props.y*100 + "%"
	}

	return createPortal(<div data-visible={props.vis} ref={popupRef} className={styles.popup}>
			<div>
				Details Here:
				{props.children}
			</div>
		</div>,
		document.getElementById('canvas_container')
	)

}
