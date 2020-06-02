import { PubSub } from "./PubSub/PubSub.js";
import { ControllerChessBoard } from "./ChessBoard/ControllerChessBoard.js";
import { ControllerHistoryOfMoves } from "./HistoryOfMoves/ControllerHistoryOfMoves.js";
import { ControllerStartGame } from "./startGame/ControllerStartGame.js";
import { AuthorizationController } from "./Authorization/AuthorizationController.js";
import { onlineGameModule } from "./modules/onlineGameModule.js";

// ---------------------Start-------------------------------

const onlineGame = new onlineGameModule();
const publisher = new PubSub();
const startGame = new ControllerStartGame(publisher);
const authorization = new AuthorizationController(publisher);
const chessBoard = new ControllerChessBoard(publisher, onlineGame);
const historyOfMoves = new ControllerHistoryOfMoves(publisher);
