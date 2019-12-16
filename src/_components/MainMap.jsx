import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search"

// var isDanger = false;

function PositionMarker(props) {
	const isTracked = props.isTracked;
	const location = props.location;
	if (isTracked) {
		return <Marker position={location}>
			<Popup>
				<span>Jesteś tutaj!</span>
			</Popup>
		</Marker>
	}
	else {
		return null
	}
}

function AlertArea(props) {
	return <div style={{
		position: 'fixed', bottom: 10, left: 10, zIndex: 1000, width: '300px', height: '200px', background: 'white', display:
			'flex', justifyContent: 'center', alignItems: 'center'
	}}>
		Jesteś teraz:
	</div>
}

function ExampleCircle(props) {
	const location = props.location;

	return <Circle center={location} radius={1000} >
		<Popup>
			<span>Zagłebie</span>
		</Popup>
	</Circle>
}

const SearchComponent = props => (
	<ReactLeafletSearch
		position="topleft"
		inputPlaceholder="Wpisz nazwę miasta"
		search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
		zoom={12} // Default value is 10
		showMarker={false}
		showPopup={false}
		openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
		closeResultsOnClick={false} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
		providerOptions={{ searchBounds: [] }} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
		customProvider={undefined | { search: (searchString) => { } }} // see examples to usage details until docs are ready
	/>
)

class MainMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}
	onEachFeature(props) {

		// layer.on({
		//   click: this.clickToFeature.bind(this)
		// });
	}

	clickToFeature(e) {
		// var layer = e.target;


	}
	render() {
		const { latitude, longitude, zoom } = this.props.location;
		const isTracked = this.props.isTracked;
		return (
			<div>
				<Map center={[latitude, longitude]} zoom={zoom}>
					<SearchComponent />
					<ExampleCircle location={[latitude, longitude]} onEachFeature={this.onEachFeature(this)} />
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					/>
					<PositionMarker location={[latitude, longitude]} isTracked={isTracked} />
				</Map>
				<AlertArea></AlertArea>
			</div>
		);
	}
}

export default MainMap;
