let state = null

export function initState(initState) {
	if(typeof initState !== 'object') 
		console.error("State has been initialized with non-object type")

	state = initState
}

export function getState() {
	if(state == null)
		console.error("Attempted to get state before initialization")

	return state
}
