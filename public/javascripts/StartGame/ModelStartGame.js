export class ModelStartGame {
	constructor() { }

	async getCreatedGamesFromSrv() {
		const gameId = this.getGameId();

		const res = await fetch('/list-games').then(res => res.json());

		res.data = res.data.filter(el => el.status === "created" || el.id === gameId);
		return res;
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

	getGameId() {
		const onlineGame = JSON.parse(localStorage.getItem("onlineGame"));
		const gameId = (onlineGame) ? onlineGame.gameId : null;
		return gameId;
	}

	deleteGame(game) {
		const token = localStorage.getItem('token');
		return fetch('/delete-game', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token,
			},
			body: JSON.stringify({ id: game })
		})
			.then(res => res.json());
	}
}