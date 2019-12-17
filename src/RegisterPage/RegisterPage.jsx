import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MenuItem, InputLabel } from '@material-ui/core';
import api from '../_helpers/api'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';


import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                confirmedPassword: '',
                clubId: ''
            },
            clubs: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        if (user.username && user.password && user.password && user.email) {
            this.props.register(user);
        }
    }

    async componentDidMount() {
        let result = await api.get('Club/GetClubs?skip=0&take=10');
        this.setState({ clubs: result.data.result.payload })

        ValidatorForm.addValidationRule('isSamePassword', () => {
            return this.state.user.password === this.state.user.confirmedPassword
        });
        ValidatorForm.addValidationRule('isLong', (value) => {
            return value.length >= 8;
        });
    }

    render() {
        const { classes } = this.props;
        const { user, clubs } = this.state;
        var loginDiv = {
            maxWidht: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
        var mainDiv = {
            height: '100vh',
        }

        return (
            <Grid container component="main" style={mainDiv}>
                <CssBaseline />
                <Grid item sm={12} md={12} className={classes.image} style={loginDiv}>
                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square >
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Rejestracja
                            </Typography>
                            <ValidatorForm ref="form" onSubmit={this.handleSubmit} className={classes.form}>
                                <TextValidator
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adres Email"
                                    name="email"
                                    validators={['required', 'isEmail']}
                                    errorMessages={['To pole jest wymagane', 'To musi być email!']}
                                    value={user.email}
                                    onChange={this.handleChange}
                                    autoFocus
                                />
                                <TextValidator
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Ksywa"
                                    name="username"
                                    validators={['required']}
                                    errorMessages={['To pole jest wymagane']}
                                    value={user.username}
                                    onChange={this.handleChange}
                                />
                                <TextValidator
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    value={user.password}
                                    onChange={this.handleChange}
                                    validators={['required', 'isLong', 'matchRegexp:[0-9]', 'matchRegexp:[A-Z]', 'matchRegexp:[a-z]', 'matchRegexp:[!@#$%^&*(),.?":{}|<>]']}
                                    errorMessages={['To pole jest wymagane', 'Minimalna długość to 8', 'Hasło musi zawierać liczbe', 'Hasło musi zawierać duża litere', 'Hasło musi zawierać małą litere', 'Hasło musi posiadać znak specjalny (!@#$%^&*(),.?":{}|<>])']}
                                    label="Hasło"
                                    type="password"
                                    id="password"
                                />
                                <TextValidator
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmedPassword"
                                    value={user.confirmedPassword}
                                    onChange={this.handleChange}
                                    validators={['required', 'isSamePassword']}
                                    errorMessages={['To pole jest wymagane', 'Hasła nie są takie same']}
                                    label="Powtórz hasło"
                                    type="password"
                                    id="confirmedPassword"
                                />
                                <InputLabel id="demo-simple-select-outlined-label">Wybierz swój klub</InputLabel>
                                <SelectValidator
                                    id="demo-simple-select-outlined"
                                    variant="outlined"
                                    value={user.clubId}
                                    onChange={this.handleChange}
                                    validators={['required']}
                                    errorMessages={['To pole jest wymagane']}
                                    fullWidth
                                    name="clubId"
                                >
                                    <MenuItem value="">
                                        <em>Wybierz klub</em>
                                    </MenuItem>
                                    {clubs.map((value, index) => {
                                        return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                                    })}
                                </SelectValidator>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Register
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
                                            to="/login"
                                            className={classes.submit}
                                        >
                                            Back
                                    </Button>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>

                                </Box>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Grid >
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
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
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
const test = withStyles(useStyles)(connectedRegisterPage);
export { test as RegisterPage };