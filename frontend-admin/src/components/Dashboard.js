import React, { useState, useEffect } from 'react'
import InputNumber from '@lib/components/InputNumber'

export default function() {
	const [sectors, setSectors] = useState(null)

	function fetchSectors(init) {
		return fetch('/api/transporters').then((res) => {
			if(res.status !== 200)
				return

			return res.json()
		}).then((data) => {
			setSectors(data)
		})
	}


	useEffect(function() {
		fetchSectors()
	}, [])

	function inputHandler(sectorId, carrierId) {
		if(carrierId === 0)
			carrierId = null

		const header = {
			method: "POST",
			body: JSON.stringify([sectorId, carrierId])
		}

		fetch('/api/sector', header).then((res) => {
			if(res.status !== 200)
				console.error("Failed to set carrier position")
		})
	}

	function mapInputs() {
		const components = []
		for(let i = 0; i < sectors.length; ++i) {
			const sectorId = i+1
			components.push(<li key={sectorId}>
				<h2>Sector Number: {sectorId}</h2>
				<InputNumber initVal={sectors[i].carrier} onChange={(val) => inputHandler(sectorId, val)} range={[0, 100]} step="1"/>
			</li>)
		}
		return components
	}

	return <ul>
		{sectors !== null && mapInputs()}
	</ul>
}
