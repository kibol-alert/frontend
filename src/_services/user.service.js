// import config from 'config';
import {
    authHeader
} from '../_helpers';

export const userService = {
    login,
    logout,
    register,
};
const config = {
    apiUrl: "https://kibol-alert-api.azurewebsites.net/api/"
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'empty',
            userName: username,
            password: password
        })
    };
    console.log(requestOptions, config.apiUrl)
    return fetch(`${config.apiUrl}Authentication/Login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.result.payload.accessToken));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    console.log(user);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            userName: user.username,
            password: user.password,
            confirmedPassword: user.confirmedPassword,
            clubId: user.clubId

        })
    };
    console.log(requestOptions, config.apiUrl);
    return fetch(`${config.apiUrl}Authentication/Register`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}