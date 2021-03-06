const registration = require('./registration');
const login = require('./login');
const setting = require('./setting');
const changeSetting = require('./changeSetting');
const createGame = require('./createGame');
const joinGame = require('./joinGame');
const listGames = require('./listGames');
const deleteGame = require('./deleteGame');

module.exports = {
  registration,
  login,
  setting,
  changeSetting,
  createGame,
  joinGame,
  listGames,
  deleteGame,
};