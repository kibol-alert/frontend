import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import api from '../../_helpers/api'
import axios from 'axios'


export default props => {
	const [open, setOpen] = useState(false);
	const [lyrics, setLyrics] = useState("");
	const { club } = props

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClickOpen = async () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeLyrics = (event, type) => {
		const { value } = event.target;
		setLyrics(value)
	};

	const handleSubmit = async () => {
		const result = await api.post('Club/AddChant', {
			clubId: club.id,
			lyrics: lyrics
		}).catch(error => {
			toast.error("Coś poszło nie tak, upewnij się, że dane są prawidłowe")
		})
		if (result)
			toast.success("Przyśpiewke dodano pomyślnie")
	}

	return (
		<div>
			<Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
				Dodaj przyśpiewke
      		</Button>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Dodaj przyśpiewke"}
					<IconButton aria-label="close" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<ValidatorForm onSubmit={handleSubmit}>
						<TextValidator
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="chant"
							label="Tekst przyśpiewki"
							name="chant"
							validators={['required']}
							errorMessages={['To pole jest wymagane']}
							value={lyrics}
							onChange={handleChangeLyrics}
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
						>
							Dodaj przyśpiewke
                        </Button>
					</ValidatorForm>
				</DialogContent>
			</Dialog>
		</div>
	);
}
