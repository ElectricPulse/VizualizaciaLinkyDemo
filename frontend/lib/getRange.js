class Reading {
	constructor(name, n) {
		this.min = 0
		this.n = n
		this.max = 0
		this.name = name
		this.i = 0
	}
}

const readings = []

function handleState(name, n) {
	for(const reading of readings) {
		if(reading.name == name)
			return reading
	}

	const newObj = new Reading(name, n)
	readings.push(newObj) 
	return newObj
}

export default function (name, val, n) {
	const reading = handleState(name, n)

	++reading.i

	if(reading.i >= n) {
		if(reading.i === n) {
			console.log(`${reading.name}, Min: ${reading.min}, Max: ${reading.max}`)
			++reading.i
			return 
		}
		if(reading.i === n+1)
			return
	}




	if(val < reading.min) {
		reading.min = val
		return 
	}

	if(val > reading.max) {
		reading.max = val
		return
	}

}
