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

        return (
            <div id="test" style={styles} >
                <SideBar right pageWrapId={"test"} outerContainerId={"app"} />
                <MainMap></MainMap>
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