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
import api from '../_helpers/api'

export default function ResponsiveDialog() {
	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState({
		columns: [
			{ title: 'Id', field: 'id' },
			{ title: 'Komunikat', field: 'message' },
			{ title: 'Metoda', field: 'methodName' },
			// { title: 'Dane', field: 'tableData' },
			{ title: 'Czas', field: 'timeStamp' },
		],
	});
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [logs, setLogs] = useState([]);

	const handleClickOpen = async () => {
		await getLogs();
		setOpen(true);
	};

	const getLogs = async () => {
		let result = await api.get('User/GetLogs');
		setLogs(result.data.result.payload);
	}


	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
				LOGI
      		</Button>
			<Dialog
				fullScreen={fullScreen}

				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Logi"}
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<MaterialTable
						columns={state.columns}
						data={logs}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
