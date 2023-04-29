import { addNode, deleteNode } from '/logic/graphicsState'

export default class {
	constructor(getBC) {
		//BC as in bounding box coordinates
		this._getBC = getBC
	}
	
	//Init event has no use now, so it isnt working
	//These are the methods the user defined object should define 
	//initEvent() {}
	//loopEvent() {}
	//hoverEvent() {}

	_hoverHandler([mouseX, mouseY]) {
		const [ x1, y1, x2, y2 ] = this._getBC()
		
		let hover = false
		if(x1 < mouseX && mouseX < x2 && y1 < mouseY && mouseY < y2)
			hover = true

		if(this._lastHover != hover)
			this.hoverEvent(hover)

		this._lastHover = hover
	}

	pack() {
		addNode(this)
	}

	unpack() {
		deleteNode(this)
	}
}
