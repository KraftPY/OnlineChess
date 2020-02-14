export class AuthorizationTemplate {
	static getModalLogIn() {
		return `<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header" style="border: 0px;">
				<h5 class="modal-title h3" id="exampleModalCenterTitle">Login</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form>
					<div class="col-auto">
						<label class="sr-only" for="inlineFormInputGroup">Username</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text"><i class="far fa-user"></i></div>
							</div>
							<input type="text" class="form-control" id="username" placeholder="Please enter user name" />
						</div>
					</div>
					<div class="col-auto my-3">
						<label class="sr-only" for="inlineFormInputGroup">Password</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text"><i class="fas fa-unlock-alt"></i></div>
							</div>
							<input type="password" class="form-control" id="password" placeholder="Please enter password" />
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
	</div>`;
	}

	static getModalSignUp() {
		return `			<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title h2" id="exampleModalCenterTitle">Create an account</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form>
					<div class="form-group">
						<label for="exampleInputEmail1">Login</label>
						<input type="email" class="form-control my-2" id="sign_up_login" aria-describedby="emailHelp" />
					</div>
					<div class="form-group">
						<label for="exampleInputEmail1">Email address</label>
						<input type="email" class="form-control my-2" id="sign_up_email" aria-describedby="emailHelp" />
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">Password</label>
						<input type="password" class="form-control my-2" id="sign_up_password" />
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">Re-enter password</label>
						<input type="password" class="form-control my-2" id="sign_up_re_password" />
					</div>
					<button type="submit" class="btn_sign_up btn btn-primary">Create a new account</button>
				</form>
			</div>
		</div>
	</div>`;
	}
}
