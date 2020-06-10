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
  },
  status: { type: String },
  opponent: { type: String },
  opColor: { type: String },
  gameHistory: { type: Object },
});

module.exports = model("Game", schema);
