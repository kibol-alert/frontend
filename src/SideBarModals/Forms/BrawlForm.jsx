import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ValidatorForm, SelectValidator, TextValidator } from 'react-material-ui-form-validator';
import { MenuItem, InputLabel } from '@material-ui/core';
import { toast } from 'react-toastify';
import api from '../../_helpers/api'
import axios from 'axios'
import DateFnsUtils from '@date-io/date-fns';

import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';


export default ({ club, user, refreshBrawl }) => {
	const [open, setOpen] = useState(false);
	const [enemyClubs, setEnemyClubs] = useState([]);
	const [brawlLocation, setBrawlLocation] = useState("")
	const [firstClub, setFirstClub] = useState("")
	const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClickOpen = async () => {
		await getEnemyClubs();
		setOpen(true);
	};

	const getEnemyClubs = async () => {
		const result = await api.get('Club/GetClub?id=' + club.id)
		const enemy = result.data.result.payload.clubRelations.filter(item => item.relation === 1)
		setEnemyClubs(enemy)
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		const { value } = event.target;
		setBrawlLocation(value);
	}

	const handleChangeClub = (event, type) => {
		const { value } = event.target;
		setFirstClub(value)
	};

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	const handleSubmit = async () => {
		const city = await axios.get('https://nominatim.openstreetmap.org/search?city=' + brawlLocation + '&format=json')
		if (city) {
			const result = await api.post('brawl/AddBrawl', {
				firstClubName: club.name,
				secondClubName: firstClub,
				date: selectedDate,
				longitude: parseFloat(city.data[0].lon),
				latitude: parseFloat(city.data[0].lat)
			}).catch(error => {
				toast.error("Coś poszło nie tak, upewnij się, że dane są prawidłowe")
			})
			if (result) {
				toast.success("Ustawke dodano pomyślnie")
				await refreshBrawl('refreshed');
				handleClose();
			}
		}

	}

	return (
		<div>
			<Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
				Dodaj ustawkę
      		</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Dodaj relację"}
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Data ustawki"
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
						<KeyboardTimePicker
							margin="normal"
							id="time-picker"
							label="Czas ustawki"
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change time',
							}}
						/>
					</MuiPickersUtilsProvider>
					<ValidatorForm onSubmit={handleSubmit}>
						<TextValidator
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Miejsce(nazwa miasta)"
							name="email"
							validators={['required']}
							errorMessages={['To pole jest wymagane']}
							value={brawlLocation}
							onChange={handleChange}
							autoFocus
						/>
						<InputLabel id="demo-simple-select-outlined-label">Wybierz przeciwny klub</InputLabel>
						<SelectValidator
							id="demo-simple-select-outlined"
							variant="outlined"
							value={firstClub}
							onChange={(e) => {
								handleChangeClub(e)
							}}
							validators={['required']}
							errorMessages={['To pole jest wymagane']}
							fullWidth
							name="clubId"
						>
							<MenuItem value="">
								<em>Wybierz klub</em>
							</MenuItem>
							{
								enemyClubs.map((value, index) => {
									return <MenuItem key={value.clubId} value={value.clubName}>{value.clubName}</MenuItem>
								})
							}
						</SelectValidator>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							Dodaj ustawkę
                        </Button>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}
