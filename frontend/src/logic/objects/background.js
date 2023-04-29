import conf from '/canvasConf.json'
import { addNode } from '/logic/graphicsState'
import Image from './image'

export default class Background extends Image {
	constructor(img, offset) {
		super(img, ...offset, conf.res, conf.res * conf.aspect)
	}
}
