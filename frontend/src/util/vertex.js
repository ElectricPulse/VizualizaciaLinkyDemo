export function rotateVertexAroundOrigin(angle, pos, origin) {
	//Remember that angles are calculated so that angles that belong to <0, 90> are in the first quadrant and our quadrant is the bottom-right not the top-right
	
	const c = Math.cos(angle)
	const s = Math.sin(angle)

	//Isolated positions - distances from origin
	const iso = [pos[0] - origin[0], pos[1] - origin[1]]
	
	const rotVert = [ 
		c * iso[0] - s * iso[1] + origin[0], 
		s * iso[0] + c * iso[1] + origin[1]
	]

	return rotVert
}

