export class ModelStartGame {
	constructor() { }

	getCreatedGamesFromSrv() {
		return fetch('/list-games', {
			method: 'GET',
		})
			.then(res => res.json());
	}

	createNewGame(game) {
		const token = localStorage.getItem('token');
		return fetch('/create-game', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
			body: JSON.stringify(game),
		})
			.then(res => res.json());
	}

	joinGame() {
		const token = localStorage.getItem('token');
		return fetch('/join-game', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			}
		})
			.then(res => res.json());
	}
}
