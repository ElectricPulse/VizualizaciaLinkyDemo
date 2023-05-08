import React from 'react'
import drawCarrier from './drawCarrier'

export default function(path, sectors, sectorPos) {
	function transHandler(curSector) {
		const curSectorPos = sectorPos[curSector-1]
		const len = path.getNearestLengthToPoint(curSectorPos)

		const pos = path.getPointAtLength(len)
		const rot = path.getAngleAtLength(len)
		return [pos, rot]
	}

	for(const s of sectors) {
		if(s.carrier === null)
			continue
		
		drawCarrier(s.carrier, s.id, () => transHandler(s.id))
	}
}
