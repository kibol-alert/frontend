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
import ClubsModalExtension from './ClubsModalExtension'
import api from '../_helpers/api'
import { toast } from 'react-toastify';

export default props => {
	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Nazwa', field: 'name' },
			{ title: 'Miasto', field: 'city' },
			{ title: 'Liga', field: 'league' },
			{ title: 'Logo', field: 'logoUri' },
		],
	});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

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
				{user.isAdmin === true &&
					<ClubRelationForm clubs={clubs}></ClubRelationForm>
				}
				<DialogTitle id="responsive-dialog-title">
					{"Kluby"}
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<MaterialTable
						columns={state.columns}
						title="Kluby"
						data={clubs}
						detailPanel={rowData => {
							console.log(rowData)
							return (<ClubsModalExtension club={rowData} user={user}></ClubsModalExtension>)
						}}
						editable={user.isAdmin ? {
							onRowUpdate: (newData, oldData) =>
								new Promise(resolve => {
									setTimeout(async () => {
										resolve();
										if (oldData) {
											const result = await api.post('club/editclub?id=' + oldData.id, newData)
												.catch(error => toast.error('Nie udało się zaktualizować, spróbuj ponownie później'))
											if (result) {
												setClubs(prevState => {
													const refreshedData = prevState.map(item => {
														console.log(item.id, newData.id)
														if (item.id === newData.id) {
															item = newData
														}
														return item;
													})
													toast.success('Udało się zaktualizować klub')
													return refreshedData;
												});
											}
										}
									}, 600);
								}),
							onRowDelete: oldData =>
								new Promise(resolve => {
									setTimeout(async () => {
										resolve();
										const result = await api.post('brawl/deletebrawl?id=' + oldData.id)
											.catch(error => {
												toast.error('Nie udało się usunąć, spróbuj ponownie później')
											})
										if (result) {
											toast.success('Udało się usunąć wpis')
											getClubs();
										}
									}, 600);
								}),
						} : { test: null }}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
