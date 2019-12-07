export function parseJWT(token) {
	let tokenPayload = token.split('.')[1];

	let base64 = tokenPayload.replace(/-/g, '+').replace(/_/g, '/');

	let content = decodeURIComponent(Array.prototype.map.call(atob(base64), function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))

	return JSON.parse(content);
}