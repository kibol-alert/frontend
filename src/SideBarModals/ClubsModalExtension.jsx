import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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
import badWords from './badwords'


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
	// const [clubStats, setClubStats] = React.useState(null);

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

	const getClubStats = async () => {
		// const result = await axios.get('http://livescore-api.com/api-client/leagues/table.json?key=MbwgnQV36wUjNtfm&secret=1rbuqob8EksnPzNCKjS7aOahk5A8zQuB&league=19')
	}

	var Filter = require('bad-words');
	const censored = new Filter();
	badWords.forEach((item) => censored.addWords(item))

	return (
		<div style={{ margin: '10px', padding: '10px', border: '2px solid #3f51b5' }}>
			<ChantForm club={club}></ChantForm>
			<Grid container component="main">
				<CssBaseline />
				<Grid item sm={6} md={6}>
					<div style={{
						'display': 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
					}}>
						<h5>Nazwa: {club.name}</h5>
						<h5>Liga: {club.league}</h5>
						<h5>Miasto: {club.city}</h5>
						<h5>Liczba fanów(aplikacji): {club.fans ? club.fans.length : 0}</h5>
					</div>
				</Grid>
				<Grid item sm={6} md={6}>
					<div style={{
						'display': 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
					}}>
						<img src={club.logoUri} alt="club_logo"></img>
					</div>
				</Grid>
			</Grid>
			<MaterialTable
				columns={state.relationColumns}
				data={club.clubRelations}
				title="Relacje"
			/>
			<h3> Przyśpiewki </h3>
			{club.chants.length === 0 && <p>Brak przyśpiewek</p>}
			<div className={classes.root}>
				{
					club.chants.map((chant, i) => {
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
		</div>
	);
}
