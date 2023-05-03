import React, { forwardRef, useState } from 'react'
import styles from './input.module.css'

export default forwardRef(function (props, ref) {	
	const [val, setVal] = useState(props.initVal)

	function changeHandler(e) {
		const newVal = parseFloat(e.target.value)

		if(ref !== null)
			ref.current = newVal

		if(props.onChange !== undefined)
			props.onChange(newVal)

		setVal(newVal)
	}
	
	return <input type="number" className={styles.number} min={props.range[0]} max={props.range[1]} step={props.step} value={val} onChange={changeHandler}/>
})
