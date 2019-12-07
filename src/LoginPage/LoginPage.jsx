import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import icon from '../assets/logo-back.png'
import Image from '../_components/Image'
// import TransitionsModal from './RegisterModal';



class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
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
        const { loggingIn, classes } = this.props;
        const { username, password } = this.state;
        var loginDiv = {
            maxWidht: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
        var mainDiv = {
            height: '100vh',
        }
        var imgStyle = {
            maxWidth: '300px',
            width: '100%',

        }
        return (
            <Grid container component="main" style={mainDiv}>
                <CssBaseline />
                <Grid item sm={12} md={12} className={clsx(classes.image)} style={loginDiv}>

                    <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square >
                        <div className={clsx(classes.paper)}>
                            <Image style={imgStyle} icon={icon} />
                            <Typography component="h1" variant="h5">
                                Sign in
                        </Typography>
                            <form onSubmit={this.handleSubmit} className={clsx(classes.form)} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={username}
                                    onChange={this.handleChange}
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={clsx(classes.submit)}
                                >
                                    Sign In
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
                                            className={clsx(classes.submit)}
                                        >
                                            Register
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>

                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Grid >
            // <div className="col-md-6 col-md-offset-3">
            //     <h2>Login</h2>
            //     <form name="form" onSubmit={this.handleSubmit}>
            //         <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
            //             <label htmlFor="username">Username</label>
            //             <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
            //             {submitted && !username &&
            //                 <div className="help-block">Username is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            //             <label htmlFor="password">Password</label>
            //             <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            //             {submitted && !password &&
            //                 <div className="help-block">Password is required</div>
            //             }
            //         </div>
            //         <div className="form-group">
            //             <button className="btn btn-primary">Login</button>
            //             {loggingIn &&
            //                 <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            //             }
            //             <Link to="/register" className="btn btn-link">Register</Link>
            //         </div>
            //     </form>
            // </div>
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