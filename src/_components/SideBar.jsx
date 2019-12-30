import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import { parseJwt } from '../_helpers/parseJWT';
import MyProfileModal from '../SideBarModals/MyProfileModal';
import MyClubModal from '../SideBarModals/MyClubModal';
import ClubsModal from '../SideBarModals/ClubsModal';
import StatsModal from '../SideBarModals/StatsModal';
import Button from '@material-ui/core/Button';
import api from '../_helpers/api';

export default props => {
	const [user, setUser] = useState({ userName: "" });

	useEffect(() => {
		async function getUser() {
			const id = parseJwt(localStorage.getItem('user')).unique_name;
			const result = await api.get('user/getUser?id=' + id);
			console.log(result);
			if (result.data.result.success === true)
				setUser(result.data.result.payload);
		}
		getUser();
	}, [])

	return (
		// Pass on our props
		<Menu {...props}>
			<h1>
				{user.userName}
			</h1>
			<h2>
				{user.clu}
			</h2>

			<a className="menu-item" >
				<MyProfileModal />
			</a>

			<a className="menu-item" >
				<MyClubModal />
			</a>
			<a className="menu-item" >
				<StatsModal />
			</a>
			<a className="menu-item" >
				<ClubsModal />
			</a>

			<Link to="/login"> <Button variant="contained" color="primary">Wyloguj się</Button></Link>
		</Menu>
	);
};