export class AuthorizationModel {
	constructor() {
		this.authUser = JSON.parse(localStorage.getItem('user'));
		this.token = localStorage.getItem('token');
	}

	getUserFullName() {
		if (this.authUser.firstName) {
			return `${this.authUser.firstName} ${this.authUser.lastName}`;
		} else {
			return this.authUser.login;
		}
	}

	regUser(data) {
		const { login, email, password, rePassword } = data;
		return fetch('/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'login': login.value,
				'email': email.value,
				'password': password.value,
				'rePassword': rePassword.value
			})
		})
			.then(res => res.json());
	}

	loginUser(data) {
		return fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json());
	}

	saveAuthUser({ user, token }) {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
		this.authUser = user;
		this.token = token;
	}

	clearAuth() {
		localStorage.setItem('user', null);
		localStorage.setItem('token', null);
		this.authUser = null;
		this.token = null;
	}

	settingUser() {
		return fetch('/setting', {
			method: 'GET',
			headers: {
				'Authorization': this.token,
			}
		})
			.then(res => res.json());

	}
}
