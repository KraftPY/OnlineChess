export class onlineGameModule {
  constructor() {
    this.socket = io.connect();
    this.init();
    this.handlerStartMove = null;
  }

  init() {
    this.socket.on("news", data => {
      console.log(data);
    });

    this.socket.on("opponent ended move", game => {
      console.log("socket");

      this.handlerStartMove(game);
    });
  }

  createGame(gameId) {
    this.socket.emit("create new game", gameId);
  }

  joinGame(gameId) {
    this.socket.emit("connect to the game", gameId);
  }

  sendMove(game) {
    this.socket.emit("send move", game);
  }
}
