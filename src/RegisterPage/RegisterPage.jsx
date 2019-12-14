import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

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
                clubId: 1
            }
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

    render() {
        const { classes } = this.props;
        const { user } = this.state;
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
                                Register
                            </Typography>
                            <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={user.email}
                                    onChange={this.handleChange}
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={user.username}
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
                                    value={user.password}
                                    onChange={this.handleChange}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmedPassword"
                                    value={user.confirmedPassword}
                                    onChange={this.handleChange}
                                    label="Confirm password"
                                    type="password"
                                    id="confirmedPassword"
                                    autoComplete="current-password"
                                />
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
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Grid >
            // <div className="col-md-6 col-md-offset-3">
            //     <h2>Register</h2>
            //     <form name="form" onSubmit={this.handleSubmit}>
            //         <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
            //             <label htmlFor="firstName">First Name</label>
            //             <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
            //             {submitted && !user.firstName &&
            //                 <div className="help-block">First Name is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
            //             <label htmlFor="lastName">Last Name</label>
            //             <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
            //             {submitted && !user.lastName &&
            //                 <div className="help-block">Last Name is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
            //             <label htmlFor="username">Username</label>
            //             <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
            //             {submitted && !user.username &&
            //                 <div className="help-block">Username is required</div>
            //             }
            //         </div>
            //         <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
            //             <label htmlFor="password">Password</label>
            //             <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
            //             {submitted && !user.password &&
            //                 <div className="help-block">Password is required</div>
            //             }
            //         </div>
            //         <div className="form-group">
            //             <button className="btn btn-primary">Register</button>
            //             {registering && 
            //                 <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            //             }
            //             <Link to="/login" className="btn btn-link">Cancel</Link>
            //         </div>
            //     </form>
            // </div>
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