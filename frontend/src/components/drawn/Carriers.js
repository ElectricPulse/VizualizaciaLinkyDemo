import React, { useEffect, useState, useRef } from 'react'

import Range from '@lib/components/Range'
import Carrier from './Carrier'

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
			if(s.carrier === null)
				return

			return <Carrier
				carrierId={s.carrier}
				sectorId={s.id}
				key={s.carrier}
				getTrans={() => transHandler(s.id)}
			/>
		  })
		}
	</>

}
