export class onlineGameModule {
  constructor(publisher) {
    this.socket = io.connect();
    this.publisher = publisher;
    this.init();
    this.handlerStartMove = null;
  }

  init() {
    this.socket.on("connection", data => {
      console.log(data.msg);

      const onlineGame = JSON.parse(localStorage.getItem("onlineGame"));

      if (onlineGame) {
        this.publisher.publish("reconnectOnlineGame");
        this.socket.emit("reconnect", onlineGame.gameId)
      }
    });

    this.socket.on("opponent ended move", game => {
      this.handlerStartMove(game);
    });
  }

  createGame(gameId, { startGame, startMove }) {

    this.handlerStartMove = startMove;
    this.socket.emit("create new game", gameId);
    this.socket.on("start game", startGame);
  }

  joinGame(gameId, login, { startGame, startMove }) {
    this.handlerStartMove = startMove;
    this.socket.emit("connect to the game", { gameId, login });
    this.socket.on("start game", startGame);
  }

  reconnect(gameId, login, startMove) {
    this.handlerStartMove = startMove;
    this.socket.emit("reconnect to the game", { gameId, login });
  }

  sendMove(id, game) {
    this.socket.emit("send move", { id, game });
  }
}
