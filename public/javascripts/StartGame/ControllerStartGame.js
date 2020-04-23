import { ViewStartGame } from './ViewStartGame.js';
import { ModelStartGame } from './ModelStartGame.js';

export class ControllerStartGame {
	constructor(publisher) {
		this.allHandlers = {
			handlerNewGameBtn: this.handlerNewGameBtn.bind(this),
			handlerLoadGameBtn: this.handlerLoadGameBtn.bind(this),
			handlerNewGameModal: this.handlerNewGameModal.bind(this),
			handlerMainModal: this.handlerMainModal.bind(this),
		};
		this.model = new ModelStartGame();
		this.view = new ViewStartGame(this.allHandlers);
		this.publisher = publisher;
	}

	async handlerNewGameBtn() {
		const createdGamesList = await this.model.getCreatedGamesFromSrv();
		this.view.openNewGameModal();
		this.view.renderTableData(createdGamesList);
	}

	handlerLoadGameBtn() {
		this.publisher.publish('startLoadGame');
	}

	handlerNewGameModal(ev) {
		const cName = ev.target.className;
		switch (cName) {
			case 'btn_close_modal_newgame': {
				this.view.closeModalWnd();
				break;
			}
			case 'tabs_left': {
				this.view.showNewGameWithOp();
				this.view.changeTabs(ev.target);
				break;
			}
			case 'tabs_right': {
				this.view.showNewGamePractice();
				this.view.changeTabs(ev.target);
				break;
			}
			case 'create_newgame': {
				const game = this.view.getCreateGameData();
				this.view.showHideNoCreateGame(false);
				if (this.validationNameGame(game.name)) {
					this.tryCreateGame(game);
				} else {
					this.view.showNoValidGameName();
				}
				break;
			}
			case 'create_practice_game': {
				this.publisher.publish('startPracticeGame');
				this.view.closeModalWnd();
				break;
			}
			case 'btn_join_game': {
				console.log(ev.target.dataset.game);
				break;
			}
			default:
				break;
		}
	}

	handlerMainModal(ev) {
		const target = ev.target;
		if (target.classList.contains('main_modal')) {
			this.view.closeModalWnd();
		}
	}

	validationNameGame(name) {
		const len = name.length;
		const patternNoHTML = /<|>/g;
		if (len < 3 || len > 16 || patternNoHTML.test(name)) {
			return false;
		} else {
			return true;
		}
	}

	async tryCreateGame(game) {
		const res = await this.model.createNewGame(game);
		if (res.status) {
			this.view.clearCreateGameData();
			const createdGamesList = await this.model.getCreatedGamesFromSrv();
			this.view.renderTableData(createdGamesList);
		} else if (res.msg == 'JsonWebTokenError' || res.msg == 'TokenExpiredError') {
			this.view.closeModalWnd();
			this.publisher.publish('no_auth');
		} else {
			this.view.showHideNoCreateGame(res.msg);
		}
	}
}
