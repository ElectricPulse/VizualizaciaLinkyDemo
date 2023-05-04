import { useEffect, useState, useRef } from 'react'
import { getNodes, initGraphicsState } from './graphicsState'
import clearCanvas from '/util/clearCanvas'

const localState = {
	mouse: [null, null],
};

function mouseHandler(event) {
	const canvas = event.target
	const rect = event.target.getBoundingClientRect()

	const real_w = rect.right - rect.left
	const real_h = rect.bottom - rect.top

	localState.mouse[0] = (event.clientX - rect.left)/real_w * canvas.width
	localState.mouse[1] =  (event.clientY - rect.top)/real_h * canvas.height
}

function mainLoop(FPS, context) {
	render(context)
	setTimeout(() => mainLoop(FPS, context), 1000/FPS)
}

function render(context) {
	clearCanvas(context)

	const nodes = getNodes()

	for(const node of nodes) {
		if(node.ready == false)
			return
	}

	for(const node of nodes) {
		node.loopEvent()
		node.draw(context)
		
		if(localState.mouse[0] === null)
			continue

		node._hoverHandler(localState.mouse) 
	}
}

//These hooks are suppose to transform the OOP nature of react into pure functions
export function useCanvas(FPS) {
	const [ready, setReady] = useState(false)
	const ref = useRef()

	useEffect(() => {
		const canvas = ref.current
		if(undefined === canvas) {
			console.error("Used useCanvas() without assigning ref to the canvas element")
			return
		}

		const context = canvas.getContext('2d')

		initGraphicsState(context)

		canvas.addEventListener("mousemove", mouseHandler)

		setReady(true)
		mainLoop(FPS, context)

		//Add deconstructor here !!
	}, [])

	return [ref, ready]
}

export function useDrawable() {

}
