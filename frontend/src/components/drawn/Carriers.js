import React, { useEffect } from 'react'
import Svg from '/logic/objects/svg'
import Transporter from './Transporter'

function transHandler(curSector) {
	const curSectorPos = sectors[curSector-1]
	const len = pathRef.current.getNearestLengthToPoint(curSectorPos) + sliderRef.current
	const pos = pathRef.current.getPointAtLength(len)
	const rot = pathRef.current.getAngleAtLength(len)
	return [pos, rot]
}

export default function(props) {
	const [data, setData] = useState(null)

	return <>
	{ props.sectors((s) => {
		if(s.carrier === 0)
			return

		return <Transporter
			index={s.carrier}
			key={s.carrier}
			getTrans={() => transHandler(s.id)}
		/>
	})}
	<Input type="range" range={[-100, 100]} step={0.1} onChange={(val) => sliderRef.current = val}/>
	</>

}
