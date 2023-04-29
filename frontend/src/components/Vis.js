import React, { useRef, useEffect, useState } from 'react'

import Canvas from './Canvas'
import Carriers from './drawn/Carriers'

import styles from './Vis.module.css'
import conf from '/canvasConf.json'
import Svg from '/logic/objects/svg'

import Background from '/logic/objects/background'
import backgroundImg from '/images/background.png'
import sectorsSvg from '/images/sectors/sectors.svg'
import pathSvg from '/images/path.svg'

const FETCH_TOUT = 500

export default function main() {
	const [ready, setReady] = useState(0)
	const [path, setPath] = useState(null)
	const [sectors, setSectors] = useState([])
	const [sectorPos, setSectorPos] = useState([])

	//Add useRender() and useRenderState() hook to circumvent the getTransform callbacks
	//Add hook to simplify bitwise mask for the individual async operations
	function fetchSectors(sectors) {
		//The callback wont get called unless the image exists - make it work based on the sectors data
		for(const sector of sectors) 
			new Svg(`/assets/images/sectors/${sector.id}.svg`, [0, 0], conf.res, (obj) => {
				obj.pack()

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

				setSectorPos((old) => {
					old.push(pos)
					return old
				})
			})
	}

		
	function fetchData(init) {
		return fetch('/api/transporters').then((res) => {
			if(res.status !== 200)
				return

			return res.json()
		}).then((data) => {
			setSectors(data)
			if(init)
				fetchSectors(data)
		})
	}


	useEffect(() => {
		const background = new Background(backgroundImg, [0, -3])
		
		fetchData(true)
		setInterval(fetchData, FETCH_TOUT)
		background.pack()
		
		new Svg(sectorsSvg, [0, 0], conf.res, (obj) => {
			obj.pack()
		})

		new Svg(pathSvg, [0, 0], conf.res, (obj) => {
			obj.pack()
			setPath(obj)
		})	
	}, [])
	

	return <section className={styles.container}>
		<Canvas fps={conf.FPS} width={conf.res} height={conf.res * conf.aspect} className={styles.canvas}>
			{ sectors[0] && path && sectorPos.length === sectors.length && <Carriers path={path} sectors={sectors} sectorPos={sectorPos}/> }
		</Canvas>

	</section>
}
