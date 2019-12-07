import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class MainMap extends React.Component {
	constructor() {
		super();
		this.state = {
			currentPosition: null,
			lat: 51.505,
			lng: -0.09,
			zoom: 9,
		};
	}

	render() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude
			})
		});
		const position = [this.state.lat, this.state.lng];

		return (
			<Map center={position} zoom={this.state.zoom}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
				/>
				<Marker position={position}>
					<Popup>
						<span>A pretty CSS3 popup. <br /> Easily customizable.</span>
					</Popup>
				</Marker>
			</Map>
		);
	}
}

function YourPosition() {
}

export default MainMap;
