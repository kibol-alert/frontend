import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import Filter from 'bad-words'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import api from '../_helpers/api'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChantForm from './Forms/ChantForm';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default props => {
  const club = props.club;
  const user = props.user;
  const [open, setOpen] = React.useState(false);
  const [myClub, setClub] = React.useState({ chants: [] });
  const [clubStats, setClubStats] = React.useState(null);

  const [state, setState] = React.useState({
    relationColumns: [
      { title: 'Id klubu', field: 'clubId' },
      { title: 'Nazwa klubu', field: 'clubName' },
      { title: 'Stosunek', field: 'relation', lookup: { 1: 'Kosa', 2: 'Sztama' } },
    ]
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = async () => {
    await getClub();
    await getClubStats();
    setOpen(true);
  };

  const getClubStats = async () => {
    // const result = await axios.get('http://livescore-api.com/api-client/leagues/table.json?key=MbwgnQV36wUjNtfm&secret=1rbuqob8EksnPzNCKjS7aOahk5A8zQuB&league=19')
  }

  const handleClose = () => {
    setOpen(false);
  };

  var Filter = require('bad-words');
  const censored = new Filter();

  const getClub = async () => {
    let result = await api.get('Club/GetClub?id=' + club.id);
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
        <ChantForm club={club}></ChantForm>
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
            columns={state.relationColumns}
            data={myClub.clubRelations}
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
          <h3> Przyśpiewki </h3>
          <div className={classes.root}>
            {

              myClub.chants.map((chant, i) => {
                let panel = `panel${i}`
                return <ExpansionPanel key={i} expanded={expanded === panel} onChange={handleChange(panel)}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>{chant.id}</Typography>
                    <Typography className={classes.secondaryHeading}>{`${chant.lyrics.substring(0, 15)}...`}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      {censored.clean(chant.lyrics)}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              })
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
