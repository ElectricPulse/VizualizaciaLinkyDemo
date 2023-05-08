import Rectangle from '/logic/objects/rectangle'

export default class extends Rectangle {
	constructor(id, setVis, getTrans) {
		super([0, 0], [30, 20], 0, "grey", 5)
		this.setVis = setVis
		this.id = id
		this.getTrans = getTrans
	}

	hoverEvent(state) {
		this.setVis(state)
	}

	loopEvent() {
		if(this.image === null)
			return

		const [ pos, rot ] = this.getTrans()
		this.moveTo(pos)
		this.rotateAt(rot)
	}
}

