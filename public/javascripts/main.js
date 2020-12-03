import { PubSub } from "/public/javascripts/pubSub/PubSub.js";
import { ControllerChessBoard } from "/public/javascripts/ChessBoard/ControllerChessBoard.js";
import { ControllerHistoryOfMoves } from "/public/javascripts/HistoryOfMoves/ControllerHistoryOfMoves.js";
import { ControllerStartGame } from "/public/javascripts/startGame/ControllerStartGame.js";
import { AuthorizationController } from "/public/javascripts/Authorization/AuthorizationController.js";
import { onlineGameModule } from "/public/javascripts/modules/onlineGameModule.js";

// ---------------------Start-------------------------------

const publisher = new PubSub();
const onlineGame = new onlineGameModule(publisher);
const startGame = new ControllerStartGame(publisher);
const authorization = new AuthorizationController(publisher);
const chessBoard = new ControllerChessBoard(publisher, onlineGame);
const historyOfMoves = new ControllerHistoryOfMoves(publisher);
