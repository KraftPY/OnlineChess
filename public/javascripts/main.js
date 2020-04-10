import { PubSub } from './PubSub/PubSub.js';
import { ControllerChessBoard } from './ChessBoard/ControllerChessBoard.js';
import { ControllerHistoryOfMoves } from './HistoryOfMoves/ControllerHistoryOfMoves.js';
import { ControllerStartGame } from './startGame/ControllerStartGame.js';
import { AuthorizationController } from './Authorization/AuthorizationController.js';
// import { io } from '/node_modules/dist/socket.io.js';

// ---------------------Start-------------------------------

const publisher = new PubSub();
// const newGame = new ControllerStartGame(publisher);
const authorization = new AuthorizationController(publisher);
const chessBoard = new ControllerChessBoard(publisher);
const historyOfMoves = new ControllerHistoryOfMoves(publisher);

const socket = io.connect();

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});