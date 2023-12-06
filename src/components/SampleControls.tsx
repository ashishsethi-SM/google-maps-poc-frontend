import React from 'react'
import heatMapData from '../mockData/heatMapData.json'
import { useSelector } from 'react-redux'
import * as turf from '@turf/turf'
import { MapState } from '@/store/slicers/mapSlice'
//@ts-ignore
const SampleControls = () => {
	//@ts-ignore
	const map = useSelector((state) => state as MapState).map.map
	function handleHeatMap() {
		heatMapData.features.forEach((f) => {
			//@ts-ignore

			// f.geometry.coordinates[0][0].forEach((co) => {
			// 	//@ts-ignore
			// 	f.geometry['coordinates'] ={ lat: co[1], lng: co[0] })
			// })
			f.geometry['newCoordinates'] = f.geometry.coordinates[0][0].map((co) => ({
				lat: co[1],
				lng: co[0],
			}))
		})
		//@ts-ignore
		const arr = []

		heatMapData.features.forEach((f) => {
			//@ts-ignore
			map?.data?.add({
				geometry: new google.maps.Data.Polygon([
					//@ts-ignore
					f.geometry.newCoordinates,
				]),
			})
			map?.data?.setStyle({
				fillColor: 'green',
				strokeWeight: 1,
				strokeColor: 'purple',
			})
			console.log('geometry', f.geometry)

			//@ts-ignore
			let centroid = turf.centroid(f.geometry)
			console.log('centroid', centroid)
			const item = new google.maps.LatLng(
				centroid.geometry.coordinates[1],
				centroid.geometry.coordinates[0],
			)
			arr.push(item)
		})

		// let bbox = turf.bbox(heatMapData)
		// map.fitBounds(bounds)
		const bounds = new google.maps.LatLngBounds()
		//@ts-ignore
		arr.forEach((ele) => bounds.extend(ele))
		map.panToBounds(bounds)
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
