import React, { useState, useEffect } from 'react';
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
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import api from '../_helpers/api'

export default props => {
  const club = props.club;
  const [open, setOpen] = React.useState(false);
  const [myClub, setClub] = React.useState([]);
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

  const handleClickOpen = async () => {
    await getClub();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getClub = async () => {
    let result = await api.get('Club/GetClub?id=' + club.id);
    console.log(result);
    setClub(result.data.result.payload);
  }

  return (
    <div>
      <Button fullWidth={true} variant="contained" color="primary" onClick={handleClickOpen}>
        MÓJ KLUB
      </Button>
      <Dialog
        fullScreen={fullScreen}

        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Mój klub"}
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container component="main">
            <CssBaseline />
            <Grid item sm={6} md={6}>
              <div style={{
                'display': 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
              }}>
                <h5>Nazwa: {myClub.name}</h5>
                <h5>Liga: {myClub.league}</h5>
                <h5>Miasto: {myClub.city}</h5>
                <h5>Liczba fanów(aplikacji): {myClub.fans ? myClub.fans.length : 0}</h5>
              </div>
            </Grid>
            <Grid item sm={6} md={6}>
              <div style={{
                'display': 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
              }}>
                <img src={myClub.logoUri} alt="club_logo"></img>
              </div>
            </Grid>
          </Grid>
          <MaterialTable
            columns={state.columns}
            data={myClub.relations}
            title="Relacje"
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

          <MaterialTable
            columns={state.columns}
            data={myClub.chants}
            title="Przyśpiewki"
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
