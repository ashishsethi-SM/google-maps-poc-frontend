import { LegacyRef, useRef, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import SampleControls from './components/SampleControls'
import { useDispatch } from 'react-redux'
import { setMap } from './store/slicers/mapSlice'

function App() {
	const dispatch = useDispatch()
	const [initMap, setInitMap] = useState()
	const mapRef = useRef() as LegacyRef<HTMLDivElement> | undefined
	const defaultProps = {
		center: {
			lat: 22.838084,
			lng: 78.626598,
		},
		zoom: 5,
	}
	async function handleApiLoaded(map: google.maps.Map, maps: google.maps.Map) {
		//@ts-ignore
		map.styles[0].stylers[0].visibility = true
		const { Map } = (await google.maps.importLibrary(
			'maps',
		)) as google.maps.MapsLibrary

		//@ts-ignore
		const baseMap = new maps.Map(mapRef.current, {
			center: defaultProps.center,
			zoom: defaultProps.zoom,
			disableDefaultUI: true,
		})
		setInitMap(baseMap)
		dispatch(setMap(baseMap))
	}
	return (
		<main className='flex min-h-screen'>
			<SampleControls initMap={initMap} />
			<div style={{ height: '100vh', width: '100%' }} ref={mapRef} id='map'>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyBX-60P46WpgQQ4u2hvJcm2iWFbE6k36XA' }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
				/>
			</div>
		</main>
	)
}

export default App
