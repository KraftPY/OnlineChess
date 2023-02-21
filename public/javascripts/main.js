import { PubSub } from "./pubSub/PubSub.js";
import { ControllerChessBoard } from "./ChessBoard/ControllerChessBoard.js";
import { ControllerHistoryOfMoves } from "./HistoryOfMoves/ControllerHistoryOfMoves.js";
import { ControllerStartGame } from "./StartGame/ControllerStartGame.js";
import { AuthorizationController } from "./Authorization/AuthorizationController.js";
import { onlineGameModule } from "./modules/onlineGameModule.js";

// ---------------------Start-------------------------------

const publisher = new PubSub();
const onlineGame = new onlineGameModule(publisher);
const startGame = new ControllerStartGame(publisher);
const authorization = new AuthorizationController(publisher);
const chessBoard = new ControllerChessBoard(publisher, onlineGame);
const historyOfMoves = new ControllerHistoryOfMoves(publisher);
