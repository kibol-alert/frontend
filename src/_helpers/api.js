import axios from 'axios';


const instance = axios.create({
	baseURL: `https://kibol-alert-api.azurewebsites.net/api/`,
	// baseURL: `http://localhost:59547/api/`,
	responseType: "json"
});

instance.interceptors.request.use((config) => {
	const token = JSON.parse(localStorage.getItem('user'));
	if (token !== null)
		config.headers.Authorization = `Bearer ${token}`;
	return config;
})

export default instance;