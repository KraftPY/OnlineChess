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

  set setHandlerStartMove(handler) {
    this.handlerStartMove = handler;
  }

  createGame(gameId) {
    this.socket.emit("create new game", gameId);
  }

  joinGame(gameId, handlerStartGame) {
    this.socket.emit("connect to the game", gameId);
    this.socket.on("start game", handlerStartGame);
  }

  sendMove(game) {
    this.socket.emit("send move", game);
  }
}
