import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default props => {
  const [open, setOpen] = React.useState(false);
  const user = props.user;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(user);


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
        <DialogContent>

          <div style={{
            'display': 'flex', justifyContent: 'center', flexDirection: 'column'
          }}>
            <h4>Ksywa: {user.userName}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Klub: {user.club.name}</h4>
            <h4>Admin: {user.isAdmin ? "tak" : "nie"}</h4>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}
