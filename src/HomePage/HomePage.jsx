import React from 'react';

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
            isTracked: false
        };
    }
    componentDidMount() {
        this.findCoordinates();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
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
        return (
            <div id="test" style={styles} >
                <SideBar right pageWrapId={"test"} outerContainerId={"app"} />
                <MainMap isTracked={this.state.isTracked} location={this.state.location}></MainMap>
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