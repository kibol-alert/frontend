import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import BrawlForm from './Forms/BrawlForm'
import api from '../_helpers/api'
import { toast } from 'react-toastify';

export default props => {

	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Nazwa', field: 'userName' },
			{ title: 'Email', field: 'email' },
			{ title: 'Przynależność', field: 'club.name' },
			{ title: 'Admin', field: 'isAdmin', lookup: { true: 'Tak', false: 'Nie' } },
			{ title: 'Ban', field: 'isBanned', lookup: { true: 'Tak', false: 'Nie' } },
		],
	});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [users, setUsers] = useState([]);
	const handleClickOpen = async () => {
		await getUsers();
		setOpen(true);
	};

	const getUsers = async () => {
		let result = await api.get('User/GetUsers?skip=0&take=1000');
		setUsers(result.data.result.payload);
	}

	const changeStateOfAdmin = async (data) => {
		if (data.isAdmin === false) {
			let result = await api.post('User/GivenAdmin?id=' + data.userId)
				.catch(error => toast.error('Ten użytkownik już ma admina'))
		}
		else {
			let result = await api.post('User/TakeAdmin?id=' + data.userId)
				.catch(error => toast.error('Ten użytkownik nie ma admina'))
		}
		toast.success('Akcja została wykonana')
		await getUsers();
	}

	const changeStateOfBanned = async (data) => {
		if (data.isBanned === false) {
			let result = await api.post('User/BanUser?id=' + data.userId)
				.catch(error => toast.error('Ten użytkownik jest już zbanowany'))
		}
		else {
			let result = await api.post('User/UnbanUser?id=' + data.userId)
				.catch(error => toast.error('Ten użytkownik nie jest zabanowany'))
		}
		toast.success('Akcja została wykonana')
		await getUsers();
	}

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
				Użytkownicy
      		</Button>
			<Dialog
				fullScreen={fullScreen}

				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Ustawki"}
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>

					<MaterialTable
						title="Ustawki"
						columns={state.columns}
						data={users}
						actions={
							[{
								icon: 'block',
								tooltip: 'Ban/Unban user',
								onClick: (event, rowData) => { changeStateOfBanned(rowData) }
							},
							{
								icon: 'person',
								tooltip: 'Give/Take admin',
								onClick: (event, rowData) => { changeStateOfAdmin(rowData) }

							}]
						}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
