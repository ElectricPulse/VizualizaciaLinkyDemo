import React, { useRef, useEffect, useState } from 'react'

import Canvas from './Canvas'

import styles from './Vis.module.css'
import conf from '/canvasConf.json'
import Svg from '/logic/objects/svg'

import Input from "@shared/components/Input"
import Background from '/logic/objects/background'
import backgroundImg from '/images/background.png'


const FETCH_DATA_TIMEOUT = 500

//Async operation masks
const PATH_SVG_READY = 1
const SECTORS_SVG_READY = 1 << 1
const SECTORS_READY = 1 << 2
const ALL_READY = PATH_SVG_READY | SECTORS_SVG_READY | SECTORS_READY

const sectors = []


export default function main() {
	//Add useRender() and useRenderState() hook to circumvent the getTransform callbacks
	//Add hook to simplify bitwise mask for the individual async operations
	function fetchSectors(i) {
		//The callback wont get called unless the image exists
		new Svg(`/assets/images/sectors/${i}.svg`, [0, 0], conf.res, (obj) => {
			if(null === obj) {
				setReady((mask) => mask | SECTORS_SVG_READY)
				return 
			}

			obj.pack()

			fetchSectors(i+1)

			//Painfully calculating center of sector
			const d = 0.01
			const pos = [0, 0]
			let vertex;
			for(let i = 0; i <= 1; i+=d) {
				vertex = obj.getPointAtFraction(i)
				pos[0] += vertex[0]
				pos[1] += vertex[1]
			}

			const factor = 1/d + 1

			pos[0] = pos[0]/factor
			pos[1] = pos[1]/factor

			sectors.push(pos)
		})
	}

		
	function fetchData() {
		return fetch('/api/transporters').then((res) => {
			if(res.status !== 200)
				return

			return res.json()
		}).then((curData) => {
			setData(curData)
		})
	}

	const pathRef = useRef(null)
	const sliderRef = useRef(0)
	const [ready, setReady] = useState(0)

	useEffect(() => {
		const background = new Background(backgroundImg, [0, -3])
		fetchSectors(1)
		background.pack()
		
		new Svg(sectorsSvg, [0, 0], conf.res, (obj) => {
			//obj.pack()
		})

		new Svg(pathSvg, [0, 0], conf.res, (obj) => {
			pathRef.current = obj
			obj.pack()
			setReady((mask) => mask | PATH_SVG_READY )
		})	
	}, [])
	

	return <section className={styles.container}>
		<Canvas fps={conf.FPS} width={conf.res} height={conf.res * conf.aspect} className={styles.canvas}>
			{ ready == ALL_READY && <Carriers path={path} sectors={data}/> }
		</Canvas>

	</section>
}
