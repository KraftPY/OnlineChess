export class ModelStartGame {
	constructor() { }

	getCreatedGamesFromSrv() {
		return fetch('/list-games', {
			method: 'GET',
		})
			.then(res => res.json());
	}

	createNewGame(game) {
		const user = JSON.parse(localStorage.getItem('user'));
		game.user = user.login;
		fetch('/create-game', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': this.token,
			},
			body: JSON.stringify(game),
		})
			.then(res => res.json())
			.then(res => console.log(res));
	}
}
