import React from 'react'
import styles from './popup.module.css'

export default function (props) {
	return <div className={styles.popup}>
			<div>
				Details Here:
				{props.children}
			</div>
	</div>
}
