import React, { useEffect } from 'react'

import { pack } from '/logic/graphics'
import styles from './vis.module.css'
import conf from '../canvasConf.json'
import Canvas from './Canvas'
import CarrierPath from './drawn/CarrierPath'
import Background from '/logic/objects/background'
import backgroundImg from '/images/background.png'

export default function() {
	useEffect(() => {
		const background = new Background(backgroundImg, [0, -3])
		pack(background)
	}, [])

	return <section className={styles.container}>
		<Canvas fps={conf.FPS} width={conf.res} height={conf.res * conf.aspect}>
			<CarrierPath/>
		</Canvas>
	</section>
}
