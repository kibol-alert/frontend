import api from '../../_helpers/api'
import React, { useEffect } from 'react';
import axios from 'axios'
import cheapRuler from 'cheap-ruler'
import { Marker, Circle, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'
import { toast } from 'react-toastify';

const ClubArea = ({ club, markerPosition, userClub, isDanger }) => {
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
		const relationType = club.clubRelations.find(item => { return item.clubId === userClub.id })
		let color = "#bbbbbb"
		let status = "Możesz śmiało tu przyjść"

		if (club.id === userClub.id) {
			color = "#228b22";
			status = "To twój teren"
		}
		if (relationType) {
			if (relationType.relation === 1) {
				color = "#d80000";
				status = "Lepiej nie wchodź na to terytorium"
			} else color = "#228b22"
		}
		const location = [club.latitude, club.longitude];
		const radius = 30000;
		const ruler = cheapRuler(0, 'meters');
		const distance = ruler.distance(location, markerPosition)
		if (distance < radius) {
			if (relationType && relationType.relation === 1) {
				status = "Lepiej stąd uciekaj"
				isDanger(relationType.relation)
			}
			else
				status = "Jesteś tu bezpieczny"

		}
		const customMarker = Leaflet.icon({ iconUrl: club.logoUri, iconSize: [38, 38] })
		return <Circle onMouseOver={(event) => { event.target.openPopup() }} onMouseOut={(event) => { event.target.closePopup() }} onClick={(event) => { event.target.bringToBack() }} center={location} color={color} radius={radius} >
			<Marker position={location} icon={customMarker}>
				<Popup>
					<p>{'Teren: ' + club.name}</p>
					<span>{status}</span>
				</Popup>
			</Marker>
			<Popup>
				<p>{'Teren: ' + club.name}</p>
				<span>{status}</span>
			</Popup>
		</Circle>
	} else
		return (null);
}

export default ClubArea;