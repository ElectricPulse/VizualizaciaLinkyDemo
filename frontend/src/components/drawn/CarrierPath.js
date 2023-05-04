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

const FETCH_TOUT = 1000

function fetchSectorPos(sectors) {
		return new Promise((res, rej) => {
			const positions = []
			for(const [index, sector] of sectors.entries()) 
				new Svg(`/assets/images/sectors/${sector.id}.svg`, [0, 0], conf.res, (obj) => {	
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

					positions.push(pos)
					if(index == sectors.length-1)
						res(positions)
				})
		})
}

function fetchSectors() {
	return fetch('/api/transporters').then((res) => {
		if(res.status !== 200)
			return

		return res.json()
	})
}

export default function main() {
	const [ready, setReady] = useState(false)
	const [path, setPath] = useState(null)
	const [sectors, setSectors] = useState([])
	const [sectorPos, setSectorPos] = useState([])

	useEffect(() => {
		const background = new Background(backgroundImg, [0, -3])
		background.pack()

		fetchSectors()
		.then((data) => {
			setSectors(data) 
			return fetchSectorPos(data)
		})
		.then((pos) => {
			setSectorPos(pos)
			setReady(true)
		})

		setInterval(() => {
			fetchSectors().then(setSectors)
		}, FETCH_TOUT)
		
		new Svg(sectorsSvg, [0, 0], conf.res, (obj) => {
			obj.pack()
		})

		new Svg(pathSvg, [0, 0], conf.res, (obj) => {
			obj.pack()
			setPath(obj)
		})	
	}, [])
	

	return <section className={styles.container}>
		<Canvas fps={conf.FPS} width={conf.res} height={conf.res * conf.aspect} ready={ready}>
			{ ready && <Carriers path={path} sectors={sectors} sectorPos={sectorPos}/> }
		</Canvas>
	</section>
}
