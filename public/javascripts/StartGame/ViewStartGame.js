import { TemplateStartGame } from "./TemplateStartGame.js";

export class ViewStartGame {
  constructor(allHandlers) {
    this.allHandlers = allHandlers;
    this.dom = {
      btnNewGame: document.querySelector("#btn_new_game"),
      btnLoadGame: document.querySelector("#btn_load_game"),
      mainModal: null,
      newGameModal: null,
      loadGameModal: null
    };
    this.init();
  }

  init() {
    const {
      handlerNewGameBtn,
      handlerLoadGameBtn,
      handlerMainModal
    } = this.allHandlers;
    this.dom.btnNewGame.addEventListener("click", handlerNewGameBtn);
    this.dom.btnLoadGame.addEventListener("click", handlerLoadGameBtn);

    // create main modal
    this.dom.mainModal = document.createElement("div");
    this.dom.mainModal.classList.add("main_modal");
    this.dom.mainModal.addEventListener("mousedown", handlerMainModal);
  }

  openNewGameModal() {
    const { handlerNewGameModal } = this.allHandlers;
    this.dom.mainModal.innerHTML = "";

    // create new game modal, add in main modal and render main modal in body
    this.dom.newGameModal = document.createElement("div");
    this.dom.newGameModal.classList.add("modal_new_game");
    this.dom.newGameModal.innerHTML = TemplateStartGame.getNewGameModal();
    this.dom.mainModal.append(this.dom.newGameModal);
    document.body.append(this.dom.mainModal);

    this.newGame = {
      container: document.querySelector(".blc_content"),
      withOpponent: document.querySelector(".with_opponent"),
      practice: document.querySelector(".practice")
    };
    this.newGame.practice.remove();

    // add general eventListener
    this.dom.newGameModal.addEventListener("click", handlerNewGameModal);
  }

  renderTableData(res, gameId) {
    // render created game list
    const tBody = document.querySelector(".created_games_list tbody");

    tBody.innerHTML = "";
    if (res.status && res.data.length) {
      res.data.forEach((game, i) => {
        const isMyGame = (gameId == game.id) ? true : false;
        tBody.innerHTML += TemplateStartGame.getTableCol(game, i, isMyGame);
      });
    } else {
      tBody.innerHTML = TemplateStartGame.getEmptyTable();
    }
  }

  showNewGameWithOp() {
    this.newGame.practice.remove();
    this.newGame.container.append(this.newGame.withOpponent);
  }

  showNewGamePractice() {
    this.newGame.withOpponent.remove();
    this.newGame.container.append(this.newGame.practice);
  }

  changeTabs(inp) {
    document
      .querySelectorAll(".tabs_group label")
      .forEach(label => label.classList.remove("checked_tab"));
    inp.labels[0].classList.add("checked_tab");
  }

  getCreateGameData() {
    return {
      name: document.querySelector("#game_name").value,
      color: document.querySelector("#game_color").value,
      password: document.querySelector("#game_password").value
    };
  }

  clearCreateGameData() {
    document.querySelector("#game_name").value = "";
    document.querySelector("#game_color").selectedIndex = 0;
    document.querySelector("#game_password").value = "";
  }

  closeModalWnd() {
    const { handlerNewGameModal } = this.allHandlers;
    if (this.dom.newGameModal) {
      this.dom.newGameModal.removeEventListener("click", handlerNewGameModal);
      this.dom.mainModal.remove();
      this.dom.newGameModal = null;
    }
  }

  showNoValidGameName() {
    const inputName = document.querySelector("#game_name");
    inputName.classList.add("no_valid_input");
    inputName.nextElementSibling.classList.remove("none");
  }

  showHideNoCreateGame(msg = false) {
    const fb = document.querySelector(".feedback_create");
    if (!msg) {
      fb.innerHTML = "";
      fb.classList.toggle("none", true);
    } else {
      fb.innerHTML = msg;
      fb.classList.remove("none");
    }
  }
}
