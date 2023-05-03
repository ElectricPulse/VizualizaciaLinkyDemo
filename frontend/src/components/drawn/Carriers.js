import React, { useEffect, useState, useRef } from 'react'

import Range from '@lib/components/Range'
import Svg from '/logic/objects/svg'
import Transporter from './Transporter'

export default function(props) {
	const sliderRef = useRef(null)

	function transHandler(curSector) {
		const curSectorPos = props.sectorPos[curSector-1]
		const len = props.path.getNearestLengthToPoint(curSectorPos) - sliderRef.current

		const pos = props.path.getPointAtLength(len)
		const rot = props.path.getAngleAtLength(len)
		return [pos, rot]
	}

	return <>
		<Range ref={sliderRef} range={[0, props.path.length]} step={0.1}/>
		{ props.sectors.map((s) => {
			if(s.carrier === 0)
				return

			return <Transporter
				index={s.carrier}
				key={s.carrier}
				getTrans={() => transHandler(s.id)}
			/>
		  })
		}
	</>

}
