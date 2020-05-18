const { Schema, model } = require("mongoose");

// создаем описание одной сущности Game, которые будут храниться в коллекции БД
const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true
  },
  userColor: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model("Game", schema);
