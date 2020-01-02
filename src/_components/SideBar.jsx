import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import { parseJwt } from '../_helpers/parseJWT';
import MyProfileModal from '../SideBarModals/MyProfileModal';
import MyClubModal from '../SideBarModals/MyClubModal';
import ClubsModal from '../SideBarModals/ClubsModal';
import StatsModal from '../SideBarModals/StatsModal';
import LogsModal from '../SideBarModals/LogsModal';
import Button from '@material-ui/core/Button';
import api from '../_helpers/api';

export default props => {
	const [user, setUser] = useState({
		userName: "",
		isAdmin: false,
		club: {
			name: "",
			logoUri: ""
		}
	});

	useEffect(() => {
		async function getUser() {
			const id = parseJwt(localStorage.getItem('user')).unique_name;
			const result = await api.get('user/getUser?id=' + id);
			if (result.data.result.success === true)
				setUser(result.data.result.payload);
		}
		getUser();
	}, [])

	return (
		// Pass on our props
		<Menu {...props}>

			<div style={{
				'display': 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
			}}>
				<img src={user.club.logoUri} alt="club_logo"></img>
				<h3>{user.club.name}</h3>
				<h1>
					{user.userName}
				</h1>
			</div>

			<a className="menu-item" >
				<MyProfileModal user={user} />
			</a>

			<a className="menu-item" >
				<MyClubModal club={user.club} />
			</a>
			<a className="menu-item" >
				<StatsModal />
			</a>
			<a className="menu-item" >
				<ClubsModal user={user} />
			</a>
			{user.isAdmin === true &&
				<a className="menu-item" >
					<LogsModal />
				</a>
			}

			<Link to="/login"> <Button fullWidth={true} variant="contained" color="primary">Wyloguj się</Button></Link>

		</Menu >
	);
};