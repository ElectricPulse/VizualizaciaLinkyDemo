import React, { forwardRef, useState } from 'react'
import styles from './input.module.css'



export default function (props) {

	return <h2>Not hi</h2>
}
/*
const [val, setVal] = useState(0)
function changeHandler(e) {
	const newVal = parseFloat(e.target.value)
	props.onChange(newVal, props.id)
	setVal(newVal)
}
*/

//<input type="range" className={styles.slider} id={props.id} min={props.range[0]} max={props.range[1]} step={props.step} value={val} onChange={changeHandler}/>