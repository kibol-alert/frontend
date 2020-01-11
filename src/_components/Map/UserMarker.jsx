import { Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'
import React from 'react';

export default (props) => {
	const isTracked = props.isTracked;
	const location = props.location;

	const customMarker = Leaflet.icon({ iconUrl: "http://www.graphit-marker.com/blog/wp-content/uploads/2012/07/you-are-here.png", iconSize: [38, 38] })

	if (isTracked) {
		return <Marker icon={customMarker} position={location}>
			<Popup>
				<span>Jesteś tutaj!</span>
			</Popup>
		</Marker>
	}
	else
		return null

}