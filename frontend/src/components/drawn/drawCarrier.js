import React from 'react'

import {ComponentNode} from '/logic/primitives'
import CanvCarrier from './CanvCarrier'
import Popup from '/components/Popup'

function CarrierPopup(carrierId, sectorId) {
	return <Popup>
		<h3>Carrier: {carrierId}</h3>
		<h3>Sector: {sectorId}</h3>
	</Popup>
}

export default function(carrierId, sectorId, getTrans) {
	const popup = new ComponentNode(() => CarrierPopup(carrierId, sectorId));
	const carrier = new CanvCarrier(carrierId, hoverHandler, getTrans);

	carrier.pack();

	function hoverHandler(hover) {
		if (hover === true) {
			popup.moveTo(carrier.pos);
			popup.pack();
			return;
		}
		if (hover === false) popup.unpack();
	}
}

//# sourceURL=webpack://CanvasDemo/./src/components/drawn/drawCarrier.js?
