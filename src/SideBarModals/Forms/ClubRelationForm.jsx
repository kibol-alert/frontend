import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';
import { MenuItem, InputLabel } from '@material-ui/core';
import { toast } from 'react-toastify';
import api from '../../_helpers/api'


export default props => {
	const [open, setOpen] = useState(false);
	const [firstClubId, setFirstClub] = useState("")
	const [secondClubId, setSecondClub] = useState("")
	const [relationType, setRelation] = useState("")
	const { clubs } = props

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event, type) => {
		const { value } = event.target;
		if (type === "first")
			setFirstClub(value)
		else if (type === "second")
			setSecondClub(value)
		else if (type === "type")
			setRelation(value)
	};

	const handleSubmit = async () => {
		const result = await api.post('club/AddRelation', {
			firstClubId: firstClubId,
			secondClubId: secondClubId,
			relation: relationType
		}).catch(error => {
			toast.error("Relacja pomiędzy tymi klubami już istnieje")
		})
		if (result)
			toast.success("Relacja dodano pomyślnie")
	}

	return (
		<div>
			<Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
				Dodaj relację
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
					<ValidatorForm onSubmit={handleSubmit}>
						<InputLabel id="demo-simple-select-outlined-label">Wybierz klub</InputLabel>
						<SelectValidator
							id="demo-simple-select-outlined"
							variant="outlined"
							value={firstClubId}
							onChange={(e) => {
								handleChange(e, "first")
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
								clubs.map((value, index) => {
									if (value.id !== secondClubId)
										return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
									return (null)
								})
							}
						</SelectValidator>
						<InputLabel id="demo-simple-select-outlined-label">Wybierz drugi klub</InputLabel>
						<SelectValidator
							id="demo-simple-select-outlined"
							variant="outlined"
							value={secondClubId}
							onChange={(e) => {
								handleChange(e, "second")
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
								clubs.map((value, index) => {
									if (value.id !== firstClubId)
										return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
									return (null)
								})
							}
						</SelectValidator>
						<InputLabel id="demo-simple-select-outlined-label">Wybierz typ relacji</InputLabel>
						<SelectValidator
							id="demo-simple-select-outlined"
							variant="outlined"
							value={relationType}
							onChange={(e) => {
								handleChange(e, "type")
							}}
							validators={['required']}
							errorMessages={['To pole jest wymagane']}
							fullWidth
							name="clubId"
						>
							<MenuItem value="">
								<em>Wybierz klub</em>
							</MenuItem>
							<MenuItem value={1}>Kosa</MenuItem>
							<MenuItem value={2}>Sztama</MenuItem>
						</SelectValidator>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							Dodaj relację
                        </Button>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}
