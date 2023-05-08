import { initState, getState } from './state'

export function getContext(context) {
	const state = getState()

	return state.context
}

export function addNode(object) { 
	const state = getState()

	state.nodes.push(object)
}

export function addDOM(object) {
	const state = getState()
	
	state.componentNodes.push(object)
}

export function delDOM(object) {
	const state = getState()

	const i = state.componentNodes.indexOf(object)
	if(i > -1)
		state.componentNodes.splice(i, 1)

}

export function delNode(object) {
	const state = getState()

	const i = state.nodes.indexOf(object)
	if(i > -1)
		state.nodes.splice(i, 1)
}

export function initGraphicsState(context) {
	initState({nodes: [], componentNodes: [], context })
}

export function getNodes() {
	const state = getState()
		
	return state.nodes
}

export function getDOM() {
	const state = getState()
	
	return state.componentNodes
}
