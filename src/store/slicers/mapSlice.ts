import { createSlice } from '@reduxjs/toolkit'

export interface MapState {
	map: google.maps.Map | null
}
const initialState: MapState = {
	map: null,
}

export const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setMap: (state, action) => void (state.map = action.payload),
	},
})

export const { setMap } = mapSlice.actions

export default mapSlice.reducer
