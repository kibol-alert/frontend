import axios from 'axios';

function authHeader() {
	let user = JSON.parse(localStorage.getItem('user'));

	if (user && user.token) {
		return user.token;
	} else {
		return null;
	}
}

export default axios.create({
	baseURL: `https://kibol-alert-api.azurewebsites.net/api/`,
	// baseURL: `http://localhost:59547/api/`,
	responseType: "json",
	headers: {
		'Authorization': `Bearer ${authHeader()}`
	}
});