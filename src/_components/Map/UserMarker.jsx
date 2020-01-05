import { Marker, Popup } from 'react-leaflet'
import React from 'react';


export default (props) => {
	const isTracked = props.isTracked;
	const location = props.location;
	if (isTracked) {
		return <Marker position={location}>
			<Popup>
				<span>Jesteś tutaj!</span>
			</Popup>
		</Marker>
	}
	else
		return null

}