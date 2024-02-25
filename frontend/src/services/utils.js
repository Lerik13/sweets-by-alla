export function isLoggedIn() {
	if (localStorage.getItem('userInfo')) {
		return true;
	}
	return false;
}

export function isAdmin() {
	//console.log("@@ isAdmin")
	//console.log(localStorage.getItem('userInfo'))
	if (localStorage.getItem('userInfo')) {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))
		return userInfo.isAdmin;
	}
	return false;
}

export function isEditor() {
	//console.log("@@ isAdmin")
	//console.log(localStorage.getItem('userInfo'))
	if (localStorage.getItem('userInfo')) {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))
		return userInfo.isEditor;
	}
	return false;
}


