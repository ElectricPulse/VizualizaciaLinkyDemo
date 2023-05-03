import React, { forwardRef, useState } from 'react'
import styles from './input.module.css'

export default forwardRef(function (props, ref) {	
	const [val, setVal] = useState(0)

	function changeHandler(e) {
		const newVal = parseFloat(e.target.value)
		ref.current = newVal
		setVal(newVal)
	}
	
	return <input type="range" className={styles.range} min={props.range[0]} max={props.range[1]} step={props.step} value={val} onChange={changeHandler}/>
})
