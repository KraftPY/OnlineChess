const Game = require("../models/game");


module.exports = socket => {
  socket.emit("connection", { msg: "Сonnected to the server!" });

  socket.on("create new game", gameId => {
    socket.join(gameId);
  });

  socket.on("connect to the game", ({ gameId, login }) => {
    Game.findOne({ _id: gameId }).then(game => {
      socket.join(gameId);
      const user = {
        name: game.user,
        color: game.userColor === "random" ? getRandomColor() : game.userColor
      };
      const opponent = {
        name: login,
        color: user.color === "black" ? "white" : "black"
      };

      socket.emit('start game', user);

      socket.broadcast.to(gameId).emit('start game', opponent);

      saveStartGame(gameId, user, opponent);
    });
  });

  socket.on("reconnect to the game", ({ gameId, login }) => {
    Game.findOne({ _id: gameId }).then(game => {
      if (game.opponent === login || game.user === login) {
        socket.join(gameId);
      }
    }).catch(err => console.log(err));
  });

  socket.on("send move", ({ id, game }) => {
    saveHistoryGame(id, game);
    socket.broadcast.to(id).emit("opponent ended move", game);
  });

  socket.on("leave game", gameId => {
    socket.broadcast.to(gameId).emit("opponent leave game");
  });
};

function getRandomColor() {
  return Math.round(Math.random()) ? "white" : "black";
}

function saveStartGame(gameId, user, opponent) {
  Game.updateOne({ _id: gameId },
    {
      $set: {
        userColor: user.color,
        opponent: opponent.name,
        opColor: opponent.color,
      }
    }).catch(err => console.log(err));
}

function saveHistoryGame(gameId, game) {
  Game.updateOne({ _id: gameId },
    {
      $set: {
        gameHistory: game
      }
    }).catch(err => console.log(err));
}