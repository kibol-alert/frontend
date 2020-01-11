import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import MyProfileModal from '../SideBarModals/MyProfileModal';
import MyClubModal from '../SideBarModals/MyClubModal';
import ClubsModal from '../SideBarModals/ClubsModal';
import LogsModal from '../SideBarModals/LogsModal';
import UsersModal from '../SideBarModals/UsersModal';
import BrawlsModal from '../SideBarModals/BrawlsModal';
import Button from '@material-ui/core/Button';

export default props => {
	const { user } = props;

	return (
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
				<MyClubModal club={user.club} user={user} />
			</a>
			<a className="menu-item" >
				<ClubsModal user={user} />
			</a>
			<a className="menu-item" >
				<BrawlsModal user={user} />
			</a>
			{user.isAdmin === true &&

				<a className="menu-item" >
					<LogsModal />
				</a>

			}
			{user.isAdmin === true &&
				<a className="menu-item" >
					<UsersModal />
				</a>}

			<Link to="/login"> <Button fullWidth={true} variant="contained" color="primary">Wyloguj się</Button></Link>

		</Menu >
	);
};