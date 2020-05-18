const arrGameId = [];

module.exports = (socket) => {
  socket.emit('news', { data: 'Hi' });

  socket.on('create new game', (id) => {
    arrGameId.push(id);
    socket.join(id, () => {
      // let rooms = Object.keys(socket.rooms);
      console.log(socket.adapter.rooms);
    });
  });


  socket.on('connect to the game', (id) => {
    console.log(socket.adapter.rooms[id]);
    socket.join(id, () => {
      let rooms = Object.keys(socket.rooms);
      console.log(rooms);
    });
  });
};