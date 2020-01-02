import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import ClubRelationForm from './Forms/ClubRelationForm'
import api from '../_helpers/api'

export default props => {
	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Id', field: 'id' },
			{ title: 'Nazwa', field: 'name' },
			{ title: 'Miasto', field: 'city' },
			{ title: 'Liga', field: 'league' },
			{ title: 'Logo', field: 'logoUri' },
		],
	});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [clubs, setClubs] = useState([]);
	const { user } = props;

	const handleClickOpen = async () => {
		await getClubs();
		setOpen(true);
	};

	const getClubs = async () => {
		let result = await api.get('Club/GetClubs?skip=0&take=100');
		setClubs(result.data.result.payload);
	}

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
				Kluby
      		</Button>
			<Dialog
				fullScreen={fullScreen}

				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Kluby"}
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{user.isAdmin === true &&
						<ClubRelationForm clubs={clubs}></ClubRelationForm>
					}
					<MaterialTable
						columns={state.columns}
						data={clubs}
						editable={{
							onRowAdd: newData =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										setState(prevState => {
											const data = [...prevState.data];
											data.push(newData);
											return { ...prevState, data };
										});
									}, 600);
								}),
							onRowUpdate: (newData, oldData) =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										if (oldData) {
											setState(prevState => {
												const data = [...prevState.data];
												data[data.indexOf(oldData)] = newData;
												return { ...prevState, data };
											});
										}
									}, 600);
								}),
							onRowDelete: oldData =>
								new Promise(resolve => {
									setTimeout(() => {
										resolve();
										setState(prevState => {
											const data = [...prevState.data];
											data.splice(data.indexOf(oldData), 1);
											return { ...prevState, data };
										});
									}, 600);
								}),
						}}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
