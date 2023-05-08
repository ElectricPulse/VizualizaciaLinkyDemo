import drawCarriers from './drawCarriers'
import { canvasAdd } from '/components/Canvas'
import Svg from '/logic/objects/svg'
import sectorsSvg from '/images/sectors/sectors.svg'
import pathSvg from '/images/path.svg'

const FETCH_TOUT = 1000

//Calculating the position of all the sectors based ... on the center of their svg :)
function fetchSectorPos(sectors) {
		return new Promise((res, rej) => {
			const positions = []
			for(const [index, sector] of sectors.entries()) 
				new Svg(`/assets/images/sectors/${sector.id}.svg`, [0, 0], null, (obj) => {	
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

let path = null
let sectors = []
let sectorPos = []
let i = 0

function done() {
	if(++i == 2) {
		const carriers = drawCarriers(path, sectors, sectorPos)
	}
}

export default function() {
	fetchSectors()
	.then((data) => {
		sectors = data
		return fetchSectorPos(data)
	})
	.then((pos) => {
		sectorPos = pos
		done()
	})

	new Svg(pathSvg, [0, 0], null, (obj) => {
		obj.pack()
		path = obj
		done()
	})	
}
