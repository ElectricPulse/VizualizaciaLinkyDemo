import { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { getContext, getNodes, getDOM, initGraphicsState, addNode, delNode, addDOM, delDOM } from './graphicsState'
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

let rerender = null

let components = []

export function packDOM(el) {
	addDOM(el)
	components = getDOM()
	rerender()
}

export function unpackDOM(el) {
	delDOM(el)
	components = getDOM()
	rerender()
}

export {
	addNode as pack,
	delNode as unpack,
	getContext
}


//These hooks are suppose to transform the OOP nature of react into pure functions
export function useCanvasProvider(FPS) {
	const [ready, setReady] = useState(false)
	const ref = useRef()
	
	//For purposes of rerender()
	const [n, setN] = useState(false)	 
 
	useEffect(() => {
		rerender = () => setN(prev => !prev)

		const canvas = ref.current
		if(undefined === canvas) {
			console.error("Used useCanvas() without assigning ref to the canvas element")
			return
		}

		const context = canvas.getContext('2d')

		initGraphicsState(context)

		canvas.addEventListener("mousemove", mouseHandler)

		mainLoop(FPS, context)
		
		setReady(true)
		//Add deconstructor here !!
	}, [])

	return [ref, ready, components]
}
