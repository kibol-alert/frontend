import React, { setState } from 'react';
import { parseJwt } from '../_helpers/parseJWT';
import api from '../_helpers/api'

import { connect } from 'react-redux';
import MainMap from '../_components/MainMap';
import SideBar from '../_components/SideBar';
import "./styles.css";

import { userActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                latitude: 52,
                longitude: 19,
                zoom: 7
            },
            user: {
                userName: "",
                isAdmin: false,
                club: {
                    name: "",
                    logoUri: ""
                }
            },
            isTracked: false
        };
    }
    componentDidMount() {
        this.getUser();
        this.findCoordinates();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    async getUser() {
        const id = parseJwt(localStorage.getItem('user')).unique_name;
        const result = await api.get('user/getUser?id=' + id);
        if (result.data.result.success === true)
            this.setState({ user: result.data.result.payload });
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = position.coords;
                const isTracked = true;
                this.setState({ location, isTracked });
            }
        );

    };

    render() {
        var styles = {
            width: '100vw'
        }
        const { user } = this.state;
        return (
            <div id="test" style={styles} >
                <SideBar right user={user} pageWrapId={"test"} outerContainerId={"app"} />
                <MainMap user={user} isTracked={this.state.isTracked} location={this.state.location}></MainMap>
            </div >
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };