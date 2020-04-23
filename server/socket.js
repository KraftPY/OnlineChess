module.exports = (socket) => {
  socket.emit('news', { data: 'Hi' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
};