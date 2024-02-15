export function isLoggedIn() {
	if (localStorage.getItem('userInfo')) {
		return true;
	}
	return false;
}