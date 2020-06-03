export class onlineGameModule {
  constructor() {
    this.socket = io.connect();
    this.init();
    this.handlerStartMove = null;
  }

  init() {
    this.socket.on("connection", data => {
      console.log(data.msg);
    });

    this.socket.on("opponent ended move", game => {
      console.log("socket");

      this.handlerStartMove(game);
    });
  }

  createGame(gameId, { startGame, startMove }) {
    this.handlerStartMove = startMove;
    this.socket.emit("create new game", gameId);
    this.socket.on("start game", startGame);
  }

  joinGame(gameId, { startGame, startMove }) {
    this.handlerStartMove = startMove;
    this.socket.emit("connect to the game", gameId);
    this.socket.on("start game", startGame);
  }

  sendMove(game) {
    this.socket.emit("send move", game);
  }
}
