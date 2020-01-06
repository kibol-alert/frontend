import React from 'react';
import { Map, TileLayer } from 'react-leaflet'
import UserMarker from './Map/UserMarker';
import ClubArea from './Map/ClubArea';
import Search from './Map/Search';

import AlertZone from './Map/AlertZone'

class MainMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dangerLevel: 0
		};
	}

	handleDangerLevel(data) {
		this.setState({ dangerLevel: data })
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.clubs !== this.props.clubs || nextProps.location.longitude !== this.props.location.longitude || nextProps.location.latitude !== this.props.location.latitude || nextState.dangerLevel !== this.state.dangerLevel) {
			return true;
		}
		return false;
	}

	render() {

		const { latitude, longitude, zoom } = this.props.location;
		const { user, clubs, isTracked } = this.props;
		const { dangerLevel } = this.state;

		console.log(dangerLevel)
		return (
			<div>
				<Map center={[latitude, longitude]} zoom={zoom}>
					<Search />
					{
						clubs.map((club, i) => {
							return (<ClubArea key={i} club={club} isDanger={(item) => this.handleDangerLevel(item)} userClub={user.club} markerPosition={[latitude, longitude]} />)
						})
					}
					<TileLayer
						attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						noWrap={true}
					/>
					<UserMarker location={[latitude, longitude]} isTracked={isTracked} />
				</Map>
				{
					isTracked && <AlertZone><b>{dangerLevel === 1 ? 'Jesteś na wrogim terenie!' : 'Jesteś tutaj bezpieczny!'}</b></AlertZone>
				}
			</div>
		);
	}
}

export default MainMap;
