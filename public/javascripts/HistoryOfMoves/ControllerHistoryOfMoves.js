import { ModelHistoryOfMoves } from "./ModelHistoryOfMoves.js";
import { ViewHistoryOfMoves } from "./ViewHistoryOfMoves.js";

export class ControllerHistoryOfMoves {
  constructor(publisher) {
    this.model = new ModelHistoryOfMoves();
    this.view = new ViewHistoryOfMoves(this.stepBackInHistoryMoves.bind(this));
    this.publisher = publisher;
    this.publisher.subscribe("moveEnd", this.addNewMove.bind(this));
    this.publisher.subscribe("loadGame", this.loadGame.bind(this));
    this.publisher.subscribe("startPracticeGame", this.newPracticeGame.bind(this));
    this.publisher.subscribe("joinOnlineGame", this.newOnlineGame.bind(this));
  }

  newPracticeGame() {
    this.view.clearListMoves();
  }

  newOnlineGame() {
    this.view.clearListMoves();
    this.model.setIsOnlineGame = true;
  }

  addNewMove() {
    const num = this.view.checkChoosedMoves();
    if (num) {
      this.model.deleteChoosedMovesFromLS(num);
    }
    const move = this.model.getMoveFromLocalStorage();
    this.view.addNewMoveToList(move, this.model.isOnlineGame);
  }

  stepBackInHistoryMoves(ev) {
    this.view.selectListElement(ev.target);
    const num = this.view.getNumMove(ev.target);
    this.publisher.publish("moveBack", num);
  }

  loadGame() {
    this.view.clearListMoves();
    const allHistoryMoves = this.model.getAllMoveFromLS();
    allHistoryMoves.forEach(el => {
      this.view.addNewMoveToList(el);
    });
  }
}
