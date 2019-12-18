import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import MyProfileModal from '../SideBarModals/MyProfileModal';
import MyClubModal from '../SideBarModals/MyClubModal';
import ClubsModal from '../SideBarModals/ClubsModal';
import StatsModal from '../SideBarModals/StatsModal';
import Button from '@material-ui/core/Button';
export default props => {
	return (
		// Pass on our props
		<Menu {...props}>
			<a className="menu-item" href="/">
				Home
		</a>

			<a className="menu-item" >
				<MyProfileModal/>
		</a>

			<a className="menu-item" >
				<MyClubModal/>
		</a>
		<a className="menu-item" >
				<StatsModal/>
		</a>
		<a className="menu-item" >
				<ClubsModal/>
		</a>

			<Link to="/login"> <Button color="secondary">Wyloguj się</Button></Link>
		</Menu>
	);
};