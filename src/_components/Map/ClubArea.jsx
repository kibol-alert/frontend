import api from '../../_helpers/api'
import React, { useEffect } from 'react';
import axios from 'axios'
import cheapRuler from 'cheap-ruler'
import { Circle, Popup } from 'react-leaflet'
import { toast } from 'react-toastify';

const areEqual = (prevProps, nextProps) => {
	if (prevProps.markerPosition !== nextProps.markerPosition)
		return false
	else
		return true;
};
const ClubArea = React.memo(({ club, markerPosition, userClub, isDanger }) => {
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
		return <Circle onClick={(event) => { event.target.bringToBack() }} center={location} color={color} radius={radius} >
			<Popup>
				<p>{'Teren: ' + club.name}</p>
				<span>{status}</span>
			</Popup>
		</Circle>
	} else
		return (null);
}, areEqual)

export default ClubArea;