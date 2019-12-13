import React from 'react';

import { connect } from 'react-redux';
import MainMap from '../_components/MainMap';
import SideBar from '../_components/SideBar';
import "./styles.css";

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;

        var styles = {
            height: '90vh',
            width: '100vw'
        }
        var userPosition = {
            lat: 0,
            lng: 0,
        }
        navigator.geolocation.getCurrentPosition((position) => {
            userPosition.lat = position.coords.latitude;
            userPosition.lng = position.coords.longitude
        });

        var position = [userPosition.lat, userPosition.lng];
        console.log(position);
        return (
            <div id="test" style={styles} >
                <SideBar right pageWrapId={"test"} outerContainerId={"app"} />
                <MainMap position={position}></MainMap>
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