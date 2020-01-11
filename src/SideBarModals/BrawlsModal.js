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
			{ title: 'Nazwa klubu', field: 'firstClubName' },
			{ title: 'Nazwa drugiego klubu', field: 'secondClubName' },
			{ title: 'Data', field: 'date' },
			{ title: 'Longitude', field: 'longitude' },
			{ title: 'Latitude', field: 'latitude' },
		],
	});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [brawls, setBrawls] = useState([]);
	const { user } = props;
	const handleClickOpen = async () => {
		await getBrawls();
		setOpen(true);
	};

	const getBrawls = async () => {
		console.log('fetched')
		let result = await api.get('Brawl/GetBrawls?skip=0&take=100');
		setBrawls(result.data.result.payload);
	}
	const refreshBrawls = useCallback(async (e) => {
		console.log(e);
		await getBrawls()
	}, [])

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
				Ustawki
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
					{user.isAdmin === true &&
						<BrawlForm club={user.club} user={user} refreshBrawl={(e) => refreshBrawls(e)}></BrawlForm>
					}
					<MaterialTable
						title="Ustawki"
						columns={state.columns}
						data={brawls}
						editable={user.isAdmin ? {
							onRowUpdate: (newData, oldData) =>
								new Promise(resolve => {
									setTimeout(async () => {
										resolve();
										if (oldData) {
											const result = await api.post('brawl/editbrawl?id=' + oldData.id, newData)
											if (result) {
												setBrawls(prevState => {
													const refreshedData = prevState.map(item => {
														console.log(item.id, newData.id)
														if (item.id === newData.id) {
															item = newData
														}
														return item;
													})
													toast.success('Udało się zaktualizować wpis')
													return refreshedData;
												});
											} else
												toast.error('Nie udało się zaktualizować, spróbuj ponownie później')
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
											getBrawls();
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
