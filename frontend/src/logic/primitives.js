import { addNode, deleteNode } from '/logic/graphicsState'

export default class {
	constructor(getHover) {
		//BC as in bounding box coordinates
		this._getHover = getHover
	}
	
	//Init event has no use now, so it isnt working
	//These are the methods the user defined object should define 
	//initEvent() {}
	loopEvent() {}
	hoverEvent() {}

	_hoverHandler(mouse) {
		if(this._getHover === undefined)
			return

		const hover = this._getHover(mouse)		

		if(this._lastHover != hover) {
			this._hoverEvent(hover)
		}

		this._lastHover = hover
	}

	pack() {
		addNode(this)
	}

	unpack() {
		deleteNode(this)
	}
}
