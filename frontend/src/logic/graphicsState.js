import { initState, getState } from './state'

export function removeNode(object) {
	//Need to implement
}

export function getContext(context) {
	const state = getState()

	return state.context
}

export function addNode(object) {
	const state = getState()
	
	state.nodes.push(object)
}

export function deleteNode(object) {
	const state = getState()

	const i = state.nodes.indexOf(object)
	if(i > -1)
		state.nodes.splice(i, 1)
}

export function initGraphicsState(context) {
	initState({nodes: [], context })
}

export function getNodes(object) {
	const state = getState()
		
	return state.nodes
}
