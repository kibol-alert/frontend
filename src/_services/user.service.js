import api from '../_helpers/api'

export const userService = {
    login,
    logout,
    register,
};

async function login(username, password) {
    let result = await api.post('Authentication/Login', {
        userName: username,
        password: password
    }).then(response => {
        return response.data.result;
    }).then(handleResponse).then(user => {
        localStorage.setItem('user', JSON.stringify(user.payload.accessToken));
        return user;
    });
    return result;
}

function logout() {
    localStorage.removeItem('user');
}

async function register(user) {
    let result = await api.post('Authentication/Register', {
        email: user.email,
        userName: user.username,
        password: user.password,
        confirmedPassword: user.confirmedPassword,
        clubId: user.clubId
    }).then(response => {
        return response.data.result;
    }).then(handleResponse)
    return result;
}

function handleResponse(response) {
    if (response.success !== true) {
        const error = (response.errorMessage)
        return Promise.reject(error);
    }
    return response;
}