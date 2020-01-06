import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

export default props => {
  const [open, setOpen] = React.useState(false);
  const user = props.user;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const Divider = styled.hr`
  width:100%;
  color:black;
  margin:0!important;
  `


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
        MÓJ PROFIL
      </Button>
      <Dialog
        fullScreen={fullScreen}

        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"MÓJ PROFIL"}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>

          <div style={{
            'display': 'flex', justifyContent: 'center', flexDirection: 'column'
          }}>

            <h5>Ksywa: {user.userName}</h5>
            <h5>Email: {user.email}</h5>
            <h5>Klub: {user.club.name}</h5>
            <h5>Admin: {user.isAdmin ? "tak" : "nie"}</h5>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}
