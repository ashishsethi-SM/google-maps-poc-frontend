import React from 'react'
import heatMapData from '../mockData/heatMapData.json'
import { useSelector } from 'react-redux'
import { MapState } from '@/store/slicers/mapSlice'
//@ts-ignore
const SampleControls = ({ initMap }) => {
	//@ts-ignore
	const map = useSelector((state) => state as MapState).map.map
	console.log('initMap', initMap)
	function handleHeatMap() {
		heatMapData.features.forEach((f) => {
			//@ts-ignore
			f.geometry['newCoordinates'] = []
			f.geometry.coordinates[0][0].forEach((co) => {
				//@ts-ignore
				f.geometry['newCoordinates'].push({ lat: co[1], lng: co[0] })
			})
		})

		heatMapData.features.forEach((f) => {
			//@ts-ignore
			map?.data?.add({
				geometry: new google.maps.Data.Polygon([
					//@ts-ignore
					f.geometry.newCoordinates,
				]),
			})
			map?.data?.setStyle({
				fillColor: 'transparent',
				strokeWeight: 1,
				strokeColor: 'purple',
			})
		})

		console.log('map', { ...{ ...map } })

		console.log('heatMapData', heatMapData)
	}
	return (
		<div>
			<button onClick={handleHeatMap}>Show Heat Map</button>
		</div>
	)
}

export default SampleControls
