import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import { parseJwt } from '../_helpers/parseJWT';
import api from '../_helpers/api';
import ClubsModal from './ClubsModal';

export default props => {
	const id = parseJwt(localStorage.getItem('user')).unique_name;
	// let result = api.get('user/getUser');
	const user = {
		username: "Testowy",
		club: {
			name: "KlubTestowy"
		}
	}

	return (
		// Pass on our props
		<Menu {...props}>
			<h2>{user.username}</h2>
			<h4>({user.club.name})</h4>
			<ClubsModal></ClubsModal>
			<Link to="/login">Logout</Link>
		</Menu>
	);
};