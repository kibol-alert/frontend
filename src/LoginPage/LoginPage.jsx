import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import icon from '../assets/logo-back.png'
import Image from '../_components/Image'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }


    render() {
        const { classes } = this.props;
        const { username, password } = this.state;
        var loginDiv = {
            maxWidht: '400px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }
        var mainDiv = {
            height: '100vh',
        }
        var imgStyle = {
            maxWidth: '300px',
            width: '100%',

        }
        var info = {
            display: 'flex',
            color: 'white',
            alignItems: 'start',
            justifyContent: 'space-between',
            marginLeft: '100px'
        }
        return (
            <Grid container component="main" style={mainDiv}>
                <CssBaseline />
                <Grid item sm={12} md={12} className={classes.image} style={loginDiv}>
                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square id="login">
                        <Grid>
                            <div className={classes.paper}>
                                <Image style={imgStyle} icon={icon} />
                                <Typography component="h1" variant="h5">
                                    Zaloguj się
                        </Typography>
                                <ValidatorForm ref="form" onSubmit={this.handleSubmit} className={classes.form}>
                                    <TextValidator
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Ksywa"
                                        name="username"
                                        value={username}
                                        onChange={this.handleChange}
                                        validators={['required']}
                                        errorMessages={['To pole jest wymagane']}
                                        autoComplete="username"
                                        autoFocus
                                    />
                                    <TextValidator
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        label="Hasło"
                                        validators={['required']}
                                        errorMessages={['To pole jest wymagane']}
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Zaloguj się
                                </Button>
                                    <Grid container>
                                        <Grid item xs>

                                        </Grid>
                                        <Grid item>
                                            <Button
                                                component={Link}
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                to="/register"
                                                className={classes.submit}
                                            >
                                                Zarejestruj
                                        </Button>
                                        </Grid>
                                    </Grid>
                                    <Box mt={5}>

                                    </Box>
                                </ValidatorForm>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} elevation={6} square >
                        <Grid>
                            <div className={classes.paper} style={info}>
                                <Typography component="h1" variant="h2">
                                    Co można dzięki aplikacji Kosa Czy Sztama?
                                </Typography>
                                <Typography component="li" variant="h6">
                                    Sprawdzić teretorium klubu
                                </Typography>
                                <Typography component="li" variant="h6">
                                    Wybrać swój ulubiony klub i uczestniczyć w jego życiu
                                </Typography>
                                <Typography component="li" variant="h6">
                                    Sprawdzać i dodawać nowe przyśpiewki klubowe
                                </Typography>
                                <Typography component="li" variant="h6">
                                    Tworzyć i przeglądać ustawki
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}


const useStyles = theme => {
    return {
        root: {
            'height': '100vh',
        },
        image: {
            background: 'rgba( 0, 59, 255, 1)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            background: 'url()'
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }
};

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
const test = withStyles(useStyles)(connectedLoginPage);
export { test as LoginPage };