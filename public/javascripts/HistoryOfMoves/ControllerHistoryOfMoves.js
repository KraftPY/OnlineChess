import { ModelHistoryOfMoves } from "./ModelHistoryOfMoves.js";
import { ViewHistoryOfMoves } from "./ViewHistoryOfMoves.js";

export class ControllerHistoryOfMoves {
  constructor(publisher) {
    this.model = new ModelHistoryOfMoves();
    this.view = new ViewHistoryOfMoves(this.stepBackInHistoryMoves.bind(this));
    this.publisher = publisher;
    this.publisher.subscribe("clearHistory", this.clearHistory.bind(this));
    this.publisher.subscribe("moveEnd", this.addNewMove.bind(this));
    this.publisher.subscribe("loadGame", this.loadGame.bind(this));
    this.publisher.subscribe("startPracticeGame", this.newPracticeGame.bind(this));
    this.publisher.subscribe("joinOnlineGame", this.newOnlineGame.bind(this));
    this.publisher.subscribe("createOnlineGame", this.newOnlineGame.bind(this));
  }

  newPracticeGame() {
    this.view.clearListMoves();
  }

  newOnlineGame() {
    this.view.clearListMoves();
  }

  clearHistory() {
    this.view.clearListMoves();
  }

  addNewMove() {
    const num = this.view.checkChoosedMoves();
    if (num) {
      this.model.deleteChoosedMovesFromLS(num);
    }
    const move = this.model.getMoveFromLocalStorage();
    const isOnlineGame = this.model.isOnlineGame();
    this.view.addNewMoveToList(move, isOnlineGame);
  }

  stepBackInHistoryMoves(ev) {
    this.view.selectListElement(ev.target);
    const num = this.view.getNumMove(ev.target);
    this.publisher.publish("moveBack", num);
  }

  loadGame(online = false) {
    this.model.setIsOnlineGame = false;
    this.view.clearListMoves();
    const allHistoryMoves = this.model.getAllMoveFromLS();
    const isOnlineGame = this.model.isOnlineGame();
    allHistoryMoves.forEach(el => {
      this.view.addNewMoveToList(el, isOnlineGame);
    });
  }
}
