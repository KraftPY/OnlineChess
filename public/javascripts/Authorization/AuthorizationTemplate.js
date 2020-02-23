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
					<form class="login_form" novalidate>
						<div class="col-auto">
							<label class="sr-only" for="auth_login">Username</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="far fa-user"></i></div>
								</div>
								<input type="text" class="form-control" id="auth_login" placeholder="Please enter user name" name="login"/>
							</div>
						</div>
						<div class="col-auto my-3">
							<label class="sr-only" for="auth_password">Password</label>
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
					</form>
				</div>
				<div class="modal-footer" style="border: 0px;">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button type="button" class="btn_login btn btn-primary">Log In</button>
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
					<h5 class="modal-title h2" id="exampleModalCenterTitle">Create an account</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form class="signup_form" novalidate>
						<div class="form-group">
							<label for="sign_up_login">Login</label>
							<input type="text" class="form-control my-2" id="sign_up_login" name="login" />
							<div class="invalid-feedback">!!!!!!!!</div>
						</div>
						<div class="form-group">
							<label for="sign_up_email">Email address</label>
							<input type="email" class="form-control my-2" id="sign_up_email"  name="email"/>
							<div class="invalid-feedback">!!!!!!!!</div>
						</div>
						<div class="form-group">
							<label for="sign_up_password">Password</label>
							<input type="password" class="form-control my-2" id="sign_up_password"  name="password"/>
							<div class="invalid-feedback">!!!!!!!!</div>
						</div>
						<div class="form-group">
							<label for="sign_up_re_password">Re-enter password</label>
							<input type="password" class="form-control my-2" id="sign_up_re_password" name="rePassword"/>
							<div class="invalid-feedback">!!!!!!!!</div>
						</div>
						<button type="submit" class="btn_sign_up btn btn-primary">Create a new account</button>
					</form>
				</div>
			</div>
		</div>
	</div>`;
	}
}
