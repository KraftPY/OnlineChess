const arrGameId = [];

module.exports = socket => {
  socket.emit("connection", { msg: "Сonnected to the server!" });

  socket.on("create new game", id => {
    arrGameId.push(id);
    socket.join(id, () => {
      // let rooms = Object.keys(socket.rooms);
      console.log(socket.adapter.rooms);
    });
  });

  socket.on("connect to the game", game => {
    // console.log(socket.adapter.rooms[id]);
    // socket.join(id, () => {
    //   let rooms = Object.keys(socket.rooms);
    //   console.log(rooms);
    // });
    const opponent = {
      name: "Pavel",
      color: "black"
    };
    socket.emit("start game", opponent);
  });

  socket.on("send move", game => {
    socket.broadcast.emit("opponent ended move", game);
  });
};
