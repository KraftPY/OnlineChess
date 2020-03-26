export class AuthorizationTemplate {
	static getModalLogIn() {
		return `
		<div class="auth_modal modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header" style="border: 0px;">
					<h5 class="modal-title h3" id="exampleModalCenterTitle">Login</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
				<p class="srvMsg ml-3 mb-2"></p>
					<form class="login_form" novalidate>
						<div class="col-auto">
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="far fa-user"></i></div>
								</div>
								<input type="text" class="form-control" id="auth_login" placeholder="Please enter user name" name="login"/>
							</div>
						</div>
						<div class="col-auto my-3">
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fas fa-unlock-alt"></i></div>
								</div>
								<input type="password" class="form-control" id="auth_password" placeholder="Please enter password" name="password"/>
							</div>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" id="checkRemember" />
							<label class="form-check-label" for="inlineFormCheck">
								Remember me
							</label>
						</div>
						<div class="float-right mt-3">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="submit" class="btn_login btn btn-primary">Log In</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>`;
	}

	static getModalSignUp() {
		return `			
		<div class="auth_modal modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<div class="d-flex flex-column">
						<h5 class="modal-title h2" id="exampleModalCenterTitle">Create an account</h5>
						<p class="srvMsg"></p>
					</div>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form class="signup_form" novalidate>
						<div class="form-group">
							<label for="sign_up_login">Login</label>
							<input type="text" class="form-control my-2" id="sign_up_login" name="login"/>
							<div class="invalid-feedback">Login length from 3 to 16 characters!</div>
						</div>
						<div class="form-group">
							<label for="sign_up_email">Email address</label>
							<input type="email" class="form-control my-2" id="sign_up_email"  name="email"/>
							<div class="invalid-feedback">Not email format</div>
						</div>
						<div class="form-group">
							<label for="sign_up_password">Password</label>
							<input type="password" class="form-control my-2" id="sign_up_password"  name="password"/>
							<div class="invalid-feedback">Password must be more than 5 characters</div>
						</div>
						<div class="form-group">
							<label for="sign_up_re_password">Re-enter password</label>
							<input type="password" class="form-control my-2" id="sign_up_re_password" name="rePassword"/>
							<div class="invalid-feedback">Passwords do not match</div>
						</div>
						<button type="submit" class="btn_sign_up btn btn-primary">Create a new account</button>
						<button class="btn_close btn btn-success none float-right" data-dismiss="modal">Close</button>
					</form>
				</div>
			</div>
		</div>
	</div>`;
	}

	static getNoAuthList() {
		return `<a class=" log_in_link my_nav_link dropdown-item" data-toggle="modal" data-target="#exampleModalCenter" data-name="log_in"><i
				class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Log In</a>
		<a class="no_account_setting_link my_nav_link dropdown-item" data-toggle="modal" data-target="#exampleModalCenter" data-name="no_setting"><i class="fas fa-user-cog"></i>&nbsp;&nbsp;Account
				settings</a>
		<div class="dropdown-divider"></div>
		<a class="sign_up_link my_nav_link dropdown-item" data-toggle="modal" data-target="#exampleModalCenter" data-name="sign_in"><i
				class="fas fa-user-plus"></i>&nbsp;&nbsp;Create account</a>
		`;
	}

	static getAuthList() {
		return `<p class="text-center user_name"></p>
		<div class="dropdown-divider"></div>
		<a class="account_setting_link my_nav_link dropdown-item" data-name="setting"><i class="fas fa-user-cog"></i>&nbsp;&nbsp;Account
			settings</a>
		<a class="logout_link my_nav_link dropdown-item" data-name="log_out"><i
				class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Log out</a>`;
	}

	static getModalSetting() {
		return `			
		<div class="setting_modal modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<div class="d-flex flex-column">
						<h5 class="modal-title h2" id="exampleModalCenterTitle">Account setting</h5>
					</div>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form class="signup_form" novalidate>
						<div class="form-group">
							<label for="sign_up_login">Login</label>
							<input type="text" class="form-control my-2" id="sign_up_login" name="login" />
							<div class="invalid-feedback">Login length from 3 to 16 characters!</div>
						</div>
						<div class="form-group">
							<label for="sign_up_email">Email address</label>
							<input type="email" class="form-control my-2" id="sign_up_email"  name="email"/>
							<div class="invalid-feedback">Not email format</div>
						</div>
						<div class="form-group">
							<label for="sign_up_password">Password</label>
							<input type="password" class="form-control my-2" id="sign_up_password"  name="password"/>
							<div class="invalid-feedback">Password must be more than 5 characters</div>
						</div>
						<div class="form-group">
							<label for="sign_up_re_password">Re-enter password</label>
							<input type="password" class="form-control my-2" id="sign_up_re_password" name="rePassword"/>
							<div class="invalid-feedback">Passwords do not match</div>
						</div>
						<button type="submit" class="btn_sign_up btn btn-primary">Create a new account</button>
						<button class="btn_close btn btn-success none float-right" data-dismiss="modal">Close</button>
					</form>
				</div>
			</div>
		</div>
	</div>`;
	}

	static getTest() {
		return `<div class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Modal title</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>Modal body text goes here.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</div>`;
	}
}
