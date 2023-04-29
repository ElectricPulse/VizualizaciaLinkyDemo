export function getVectorAngle(initialPoint, terminationPoint) {
	const dy = terminationPoint[1]-initialPoint[1]
	const dx = terminationPoint[0]-initialPoint[0]
	
	//Have to handle for when dx is 0 - cant divide by zero
	const derivation = dx === 0 ? 0 : dy/dx
	
	//Adding Math.PI (180 degrees) if the angle is in the second or third quadrant
	let rot = Math.atan(derivation) + (dx < 0 ? Math.PI: 0)
	
	//Cases where derivation would be 0 
	if(dy === 0)
		rot = dx > 0 ? 0 : Math.PI

	if(dx === 0)
		rot = dy > 0 ? Math.PI/2: Math.PI * 3/2 
	

	return rot
}
