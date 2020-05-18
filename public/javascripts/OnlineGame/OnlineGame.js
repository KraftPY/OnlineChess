export class OnlineGame {
  constructor() {
    this.socket = io.connect();
    this.init();
  }

  init() {
    this.socket.on('news', data => {
      console.log(data);
    });
  }

  createGame(gameId) {
    this.socket.emit('create new game', gameId);
  }

  joinGame(gameId) {
    this.socket.emit('connect to the game', gameId);
  }

}
