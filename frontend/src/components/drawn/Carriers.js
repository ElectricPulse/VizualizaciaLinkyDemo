import React, { useEffect, useState, useRef } from 'react'

import Input from '@lib/components/Input'
import Svg from '/logic/objects/svg'
import Transporter from './Transporter'

export default function(props) {
	const sliderRef = useRef(null)

	function transHandler(curSector) {
		const curSectorPos = props.sectorPos[curSector-1]
		const len = props.path.getNearestLengthToPoint(curSectorPos) + sliderRef.current
		const pos = props.path.getPointAtLength(len)
		const rot = props.path.getAngleAtLength(len)
		return [pos, rot]
	}

	return <>
	{ props.sectors.map((s) => {
		if(s.carrier === 0)
			return

		return <Transporter
			index={s.carrier}
			key={s.carrier}
			getTrans={() => transHandler(s.id)}
		/>
	})}
	<Input type="range" ref={sliderRef} range={[-100, 100]} step={0.1} onChange={(val) => sliderRef.current = val}/>
	</>

}
