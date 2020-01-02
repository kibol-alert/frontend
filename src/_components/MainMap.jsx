import React, { useEffect } from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search"
import cheapRuler from 'cheap-ruler'
import { toast } from 'react-toastify';
import api from '../_helpers/api'
import axios from 'axios'

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
	else
		return null

}

function ClubArea(props) {
	const { club, markerPosition } = props;
	useEffect(() => {
		const fetchData = async () => {
			if (club.latitude === null && club.longitude === null) {
				const coords = await axios.get('https://nominatim.openstreetmap.org/search?city=' + club.city + '&format=json')
				await api.post('Club/EditClub?id=' + club.id, {
					name: null,
					league: null,
					logoUri: null,
					longitude: parseFloat(coords.data[0].lon),
					latitude: parseFloat(coords.data[0].lat)
				})
				toast.info("Odśwież stronę (F5)")
			}

		};
		fetchData();
	}, []);

	if (club.latitude !== null && club.longitude !== null) {
		const location = [club.latitude, club.longitude];
		const radius = 30000;
		var ruler = cheapRuler(0, 'meters');
		var distance = ruler.distance(location, markerPosition)
		var result = distance < radius ? 'inside' : 'outside';
		return <Circle center={location} color={"#228B22"} radius={radius} >
			<Popup>
				<span>{club.name + 'Marker ' + result + ' of the circle'}</span>
			</Popup>
		</Circle>
	} else
		return (null);
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
			clubs: []
		};
	}

	async componentDidMount() {
		let result = await api.get('Club/GetClubs?skip=0&take=100');
		this.setState({ clubs: result.data.result.payload })
	}

	render() {
		const { latitude, longitude, zoom } = this.props.location;
		const { clubs } = this.state;
		const isTracked = this.props.isTracked;
		return (
			<div>
				<Map ref="map" center={[latitude, longitude]} zoom={zoom}>
					<SearchComponent />
					{
						clubs.map((club, i) => {
							return (<ClubArea key={i} club={club} markerPosition={[latitude, longitude]} />)
						})
					}
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
						noWrap={true}
					/>
					<PositionMarker location={[latitude, longitude]} isTracked={isTracked} />
				</Map>
			</div>
		);
	}
}

export default MainMap;
