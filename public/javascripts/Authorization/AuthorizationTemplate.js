export class AuthorizationTemplate {
	static getModalLogIn() {
		return `<div class="auth_modal" data-name="login">
		<div class="title_block">
			<h5 class="title_modal">Login</h5>
			<button class="close_btn close_form">&times;</button>
		</div>
		<p class="srv_msg"></p>
		<form class="login_form">
			<div class="input_group">
				<div class="prepend_ico"><i class="far fa-user"></i></div>
				<input type="text" class="input_group_inp" id="auth_login" placeholder="Please enter user name" name="login" />
			</div>
			<div class="input_group">
				<div class="prepend_ico"><i class="fas fa-unlock-alt"></i></div>
				<input type="password" class="input_group_inp" id="auth_password" placeholder="Please enter password"
					name="password" />
			</div>
			<div class="btn_group">
				<button type="button" class="close_form btn-secondary">Close</button>
				<button type="submit" class="btn_login btn-primary">Log In</button>
			</div>
		</form>
	</div>`;
	}

	static getModalSignUp() {
		return `<div class="auth_modal" data-name="signup">
		<div class="title_block">
			<h5 class="title_modal">Create an account</h5>
			<button class="close_btn close_form">&times;</button>
		</div>
		<p class="srv_msg"></p>
		<form class="signup_form" novalidate>
			<div class="form_group_col">
				<label for="sign_up_login">Login</label>
				<input type="text" class="form_group_inp" id="sign_up_login" name="login" />
				<div class="invalid_feedback none">Login length from 3 to 16 characters!</div>
			</div>
			<div class="form_group_col">
				<label for="sign_up_email">Email address</label>
				<input type="email" class="form_group_inp" id="sign_up_email" name="email" />
				<div class="invalid_feedback none">Not email format</div>
			</div>
			<div class="form_group_col">
				<label for="sign_up_password">Password</label>
				<input type="password" class="form_group_inp" id="sign_up_password" name="password" />
				<div class="invalid_feedback none">Password must be more than 5 characters</div>
			</div>
			<div class="form_group_col">
				<label for="sign_up_re_password">Re-enter password</label>
				<input type="password" class="form_group_inp" id="sign_up_re_password" name="rePassword" />
				<div class="invalid_feedback none">Passwords do not match</div>
			</div>
			<div class="btn_group">
				<button type="button" class="close_form btn_close none">Close</button>
				<button type="submit" class="btn_sign btn-primary">Create a new account</button>
			</div>
		</form>
	</div>`;
	}

	static getNoAuthList() {
		return `<ul class="submenu_list">
		<li data-name="log_in"><i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Log In</li>
		<li data-name="no_setting"><i class="fas fa-user-cog"></i>&nbsp;&nbsp;Account setting</li>
		<hr />
		<li data-name="sign_in"><i class="fas fa-user-plus"></i>&nbsp;&nbsp;Create account</li>
	</ul>`;
	}

	static getAuthList() {
		return `<ul class="submenu_list">
		<p class="user_name"></p>
		<li data-name="setting"><i class="fas fa-user-cog"></i>&nbsp;&nbsp;Account settings</li>
		<hr />
		<li data-name="log_out"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Log out</li>
	</ul>`;
	}

	static getModalSetting({ email, firstName, lastName }) {
		return `<div class="setting_modal" data-name="accSetting">
		<div class="title_block">
			<h5 class="title_modal">Account setting</h5>
			<button class="close_btn close_form">&times;</button>
		</div>
		<p class="srv_msg"></p>
		<form class="setting_form" novalidate>
			<div class="form_group_row">
				<label for="first_name">First name:</label>
				<div class="groupe_feedback_input">
					<input type="text" class="form_group_inp" id="first_name" name="firstName" value="${firstName}"/>
					<div class="invalid_feedback none">First name must contain only letters!</div>
				</div>
			</div>
			<div class="form_group_row">
				<label for="last_name">Last name:</label>
				<div class="groupe_feedback_input">
					<input type="text" class="form_group_inp" id="last_name" name="lastName" value="${lastName}" />
					<div class="invalid_feedback none">Last name must contain only letters!</div>
				</div>
			</div>
			<div class="form_group_row">
				<label for="setting_email">Email address:</label>
				<div class="groupe_feedback_input">
					<input type="email" class="form_group_inp" id="setting_email" name="email" value="${email}" />
					<div class="invalid_feedback none">Not email format</div>
				</div>
			</div>
			<div class="form_group_row">
				<label for="old_password">Old password:</label>
				<div class="groupe_feedback_input">
					<input type="password" class="form_group_inp" id="old_password" name="oldPassword" />
					<div class="invalid_feedback none">The password is incorrect</div>
				</div>
			</div>
			<div class="form_group_row">
				<label for="setting_new_password">Password:</label>
				<div class="groupe_feedback_input">
					<input type="password" class="form_group_inp" id="setting_new_password" name="newPassword" />
					<div class="invalid_feedback none">The password must be more than 5 characters</div>
				</div>
			</div>
			<div class="form_group_row">
				<label for="setting_new_re_password">Re-enter password:</label>
				<div class="groupe_feedback_input">
					<input type="password" class="form_group_inp" id="setting_new_re_password" name="newRePassword" />
					<div class="invalid_feedback none">The passwords do not match</div>
				</div>
			</div>
			<div class="btn_group">
				<button type="button" class="close_form btn_close none">Close</button>
				<button type="submit" class="btn_sign btn-primary">Change setting</button>
			</div>
		</form>
	</div>`;
	}

}
