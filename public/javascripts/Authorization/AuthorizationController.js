import { AuthorizationView } from './AuthorizationView.js';
import { AuthorizationModel } from './AuthorizationModel.js';

export class AuthorizationController {
	constructor(publisher) {
		this.view = new AuthorizationView({
			handlerLogIn: this.handlerLogIn.bind(this),
			handlerAccountSetting: this.handlerAccountSetting.bind(this),
			handlerSignUp: this.handlerSignUp.bind(this),
			handlerLogOut: this.handlerLogOut.bind(this),
			handlerNoAccountSetting: this.handlerNoAccountSetting.bind(this),
		});
		this.model = new AuthorizationModel();
		this.publisher = publisher;
		this.start();
	}

	start() {
		if (this.model.authUser) {
			const name = this.model.getUserFullName();
			this.view.renderAuthMenu(name);
		} else {
			this.view.renderNoAuthMenu();
		}
	}

	// Registration
	handlerSignUp() {
		this.view.renderSignUpModal(this.handlerRegistration.bind(this));
	}

	handlerRegistration(ev) {
		ev.preventDefault();
		const regForm = ev.target.elements;
		const regFields = {
			login: regForm.login.value,
			email: regForm.email.value,
			password: regForm.password.value,
			rePassword: regForm.rePassword.value
		};
		const validRegForm = this.regValidation(regFields);
		if (validRegForm.status) {
			this.sendRegFormToServer(regForm);
		} else {
			this.view.showValidFields(regForm, validRegForm);
		}
	}

	async sendRegFormToServer(regForm) {
		const response = await this.model.regUser(regForm);
		this.view.showValidFields(regForm, response);
	}

	regValidation(regFields) {
		const { login, email, password, rePassword } = regFields;
		let answ = {
			status: true,
			fields: []
		};
		// check valid login
		if (!login || login.length < 3 || login.length > 16) {
			answ.status = false;
			answ.fields.push('login');
		}
		// check valid email
		const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!email || !pattern.test(email)) {
			answ.status = false;
			answ.fields.push('email');
		}
		// check valid password
		if (!password || password.length < 5) {
			answ.status = false;
			answ.fields.push('password');
		} else if (password !== rePassword) {
			answ.status = false;
			answ.fields.push('password', 'rePassword');
		}
		return answ;
	}

	// Authorization
	handlerLogIn() {
		this.view.renderLogInModal(this.handlerAuthorization.bind(this));
	}

	async handlerAuthorization(ev) {
		ev.preventDefault();
		const loginForm = ev.target.elements;
		const loginFields = {
			login: loginForm.login.value,
			password: loginForm.password.value
		};
		let answ = {
			status: true,
			fields: []
		};

		if (!loginFields.login) {
			answ.status = false;
			answ.fields.push('login');
		}
		if (!loginFields.password) {
			answ.status = false;
			answ.fields.push('password');
		}

		if (!answ.status) {
			this.view.showValidFields(loginForm, answ);
		} else {
			const response = await this.model.loginUser(loginFields);
			if (response.status) {
				this.view.closeModal();
				this.model.saveAuthUser(response);
				const name = this.model.getUserFullName();
				this.view.renderAuthMenu(name);
			} else {
				this.view.showValidFields(loginForm, response);
			}

		}
	}

	// User settings
	async	handlerAccountSetting() {
		const response = await this.model.settingUser();
		if (response.status) {
			this.view.renderSettingModal(response.data);
		} else {
			this.handlerLogOut();
			this.view.renderLogInModal(this.handlerAuthorization.bind(this));
		}
	}

	handlerNoAccountSetting() {
		this.view.renderLogInModal(this.handlerAuthorization.bind(this));
	}

	handlerLogOut() {
		this.model.clearAuth();
		this.view.renderNoAuthMenu();
	}

}
