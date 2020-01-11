import { Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'
import React from 'react';

export default (props) => {
	const { brawl } = props;

	const customMarker = Leaflet.icon({ iconUrl: "https://www.graphicsprings.com/filestorage/stencils/8493ffdd2e1ea4335a02d986dfb47654.png?width=500&height=500", iconSize: [38, 38] })

	return <Marker icon={customMarker} position={[brawl.latitude, brawl.longitude]}>
		<Popup>
			<h4>Ustawka!</h4>
			<p>{`${brawl.firstClubName} vs ${brawl.secondClubName}`}</p>
			<p> {brawl.date}</p>
		</Popup>
	</Marker>



}