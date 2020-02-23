export class AuthorizationModel {
	constructor() {
	}

	regUser(data) {
		const { login, email, password, rePassword } = data;
		return fetch('/authorization', {
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

	authUser(data) {
		const { login, password } = data;
		console.log(login, password);
	}
}
