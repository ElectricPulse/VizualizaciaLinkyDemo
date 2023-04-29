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

function initEvent() {
	//execute initEvents in all state.nodes
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
		if(node?.loopEvent !== undefined)
			node.loopEvent()

		node.draw(context)

		if(node?.hoverHandler !== undefined)
			node.hoverHandler(localState.mouse) 
	}
}

export function startVis(canvas, FPS) {
	const context = canvas.getContext('2d')

	initGraphicsState(context)

	canvas.addEventListener("mousemove", mouseHandler)

	initEvent()	
	mainLoop(FPS, context)
}

