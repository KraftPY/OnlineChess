export class TemplateStartGame {
	static getNewGameModal() {
		return `<button class="btn_close_modal_newgame">&times;</button>
		<div class="tabs_group">
			<input type="checkbox" id="tabs_left" class="tabs_left" checked><label class="checked_tab left_label"
				for="tabs_left">New game
				with opponent</label>
			<input type="checkbox" id="tabs_right" class="tabs_right"><label class="right_label" for="tabs_right">Practice
				game</label>
		</div>
		<div class="blc_content">
			<div class="with_opponent">
				<div class="create_game_block">
					<div class="form_conteiner">
						<div class="label_container">
							<label for="game_name">Game name:</label>
						</div>
						<div>
							<input type="text" class="game_name" id="game_name" name="name" />
							<div class="feedback_blc none">Length must be between 3 and 16 characters!</div>
						</div>
					</div>
					<div class="form_conteiner">
						<label for="game_color">Color piece:</label>
						<select class="game_color" id="game_color" name="color">
							<option value="random" selected>Random</option>
							<option value="white">White</option>
							<option value="black">Black</option>
						</select>
					</div>
					<div class="form_conteiner">
						<label for="game_password">Password:</label>
						<input type="password" class="game_password" id="game_password" name="password" />
					</div>
					<button class="create_newgame">Create new game</button>
					<div class="feedback_create none"></div>
				</div>
				<div class="table_container">
					<table class="created_games_list">
						<thead>
							<tr>
								<th>№</th>
								<th>Game name</th>
								<th>Opponent (color)</th>
								<th>Join</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
			<div class="practice">
				<button class="create_practice_game">Create practice game</button>
			</div>
		</div>`;
	}

	static getTableCol(game, num) {
		return `<tr>
		<td>${num + 1}</td>
		<td>${game.name}</td>
		<td>${game.user} (${game.color})</td>
		<td>
			<button class="btn_join_game" data-game="${game.id}">Join</button>
		</td>
	</tr>`;
	}

	static getEmptyTable() {
		return `<tr>
		<td colspan="4">No created games</td>
	</tr>`;
	}

	static getLoadGameModal() {
		return ``;
	}
}
