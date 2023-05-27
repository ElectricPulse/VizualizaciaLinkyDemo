import React, {useRef} from 'react'
import {ComponentNode} from '/logic/primitives'
import drawCarrier from './drawCarrier'
import Range from '@lib/components/Range'
let h = null

function ch(val) {
	h = val
}

function MyRange() {
	const ref = useRef()
	return <Range onChange={ch} range={[0, 3000]} ref={ref} step={0.001}/>
}

export default function(path, sectors, sectorPos) {
	const range = new ComponentNode(MyRange)
	range.pack()

	function transHandler(curSector) {
		const curSectorPos = sectorPos[curSector-1]
		const len = path.getNearestLengthToPoint(curSectorPos) - h

		const pos = path.getPointAtLength(len)
		const rot = path.getAngleAtLength(len)

		return [pos, rot]
	}

	for(const s of sectors) {
		if(s.carrier === null) {
			debugger
			continue
		}

		if(sectorPos[s.id-1] === undefined ) {
			debugger
			continue
		}
		drawCarrier(s.carrier, s.id, () => transHandler(s.id))
	}
}
