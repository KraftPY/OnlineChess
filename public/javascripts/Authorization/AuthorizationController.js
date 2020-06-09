import { AuthorizationView } from './AuthorizationView.js';
import { AuthorizationModel } from './AuthorizationModel.js';

export class AuthorizationController {
	constructor(publisher) {
		this.view = new AuthorizationView({
			handlerNoAuthMenu: this.handlerNoAuthMenu.bind(this),
			handlerAuthMenu: this.handlerAuthMenu.bind(this),
			handlerSubmenu: this.handlerSubmenu.bind(this),
			handlerMainModal: this.handlerMainModal.bind(this),
			handlerBody: this.handlerBody.bind(this),
		});
		this.model = new AuthorizationModel();
		this.publisher = publisher;
		this.publisher.subscribe('no_auth', this.handlerNoAuthGlobalEvent.bind(this));
	}

	handlerSubmenu() {
		if (this.model.authUser) {
			const name = this.model.getUserFullName();
			this.view.renderAuthMenu(name);
		} else {
			this.view.renderNoAuthMenu();
		}
	}

	handlerNoAuthMenu(ev) {
		ev.preventDefault();
		switch (true) {
			case ev.target.dataset.name == 'log_in':
				this.view.renderLogInModal(this.handlerAuthorization.bind(this), this.handlerCloseModal.bind(this));
				this.view.closeSubmenu();
				break;
			case ev.target.dataset.name == 'no_setting':
				this.view.renderLogInModal(this.handlerAuthorization.bind(this), this.handlerCloseModal.bind(this));
				this.view.closeSubmenu();
				break;
			case ev.target.dataset.name == 'sign_in':
				this.view.renderSignUpModal(this.handlerRegistration.bind(this), this.handlerCloseModal.bind(this));
				this.view.closeSubmenu();
				break;
		}
	}

	handlerAuthMenu(ev) {
		ev.preventDefault();
		switch (true) {
			case ev.target.dataset.name == 'setting':
				this.view.closeSubmenu();
				this.getSettingAndRenderSettingModal();
				break;
			case ev.target.dataset.name == 'log_out':
				this.logOut();
				break;
		}
	}

	handlerMainModal(ev) {
		const target = ev.target;
		(target.classList.contains('main_modal_auth')) ? this.view.closeModal() : false;
	}

	handlerBody(ev) {
		const target = ev.target;
		if (this.view.isOpenSubMenu) {
			if (!target.classList.contains('submenu_list') &&
				!target.parentElement.classList.contains('submenu_list') &&
				!target.classList.contains('auth_btn') &&
				!target.parentElement.classList.contains('auth_btn')) {
				this.view.closeSubmenu();
			}
		} else if (target.classList.contains('main_modal')) {
			this.view.closeModal();
		}
	}

	// Registration
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
		const patternNoHTML = /<|>/g;
		// check valid login
		if (!login || login.length < 3 || login.length > 16 || patternNoHTML.test(login)) {
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
	async	handlerAccountSetting(ev) {
		ev.preventDefault();
		const regForm = ev.target.elements;
		const regFields = {
			firstName: regForm.firstName.value,
			lastName: regForm.lastName.value,
			email: regForm.email.value,
			oldPassword: regForm.oldPassword.value,
			newPassword: regForm.newPassword.value,
			newRePassword: regForm.newRePassword.value,
		};
		const validRegForm = this.settingValidation(regFields);
		if (validRegForm.status) {
			this.sendSettingFormToServer(regFields, regForm);
		} else {
			this.view.showValidFields(regForm, validRegForm);
		}
	}

	async sendSettingFormToServer(regFields, regForm) {
		const response = await this.model.postSettingUser(regFields);
		if (response.msg == 'TokenExpiredError') {
			this.view.closeModal();
			this.logOut();
			this.view.renderLogInModal();
			this.view.closeSubmenu();
		} else {
			this.view.showValidFields(regForm, response);
		}
		// save change user settings to localStorage
		if (response.status) {
			const user = {
				firstName: regFields.firstName,
				lastName: regFields.lastName,
				email: regFields.email,
			};
			this.model.changeUserSettings(user);
			const name = this.model.getUserFullName();
			this.view.renderAuthMenu(name);
			this.view.closeSubmenu();
		}
	}

	settingValidation(regFields) {
		const { firstName, lastName, email, oldPassword, newPassword, newRePassword } = regFields;
		let answ = {
			status: true,
			fields: []
		};
		// check valid first and last name
		// [A-Za-zА-Яа-яЁёІіЇїЄє-]{1,50}
		const patternName = /([A-Za-zА-Яа-яЁёІіЇїЄє-]{1,50})+((\s+([A-Za-zА-Яа-яЁёІіЇїЄє-]{1,50})+)?)+/;
		const patternNoHTML = /<|>/g;
		if (firstName && (!patternName.test(firstName) || patternNoHTML.test(firstName))) {
			answ.status = false;
			answ.fields.push('firstName');
		}
		if (lastName && (!patternName.test(lastName) || patternNoHTML.test(lastName))) {
			answ.status = false;
			answ.fields.push('lastName');
		}
		// check valid email
		const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!email || !patternEmail.test(email)) {
			answ.status = false;
			answ.fields.push('email');
		}
		// check valid password
		if (!oldPassword && newPassword) {
			answ.status = false;
			answ.fields.push('oldPassword');
		} else if (oldPassword && !newPassword) {
			answ.status = false;
			answ.fields.push('newPassword');
		} else if (newPassword && newPassword.length < 5) {
			answ.status = false;
			answ.fields.push('newPassword');
		} else if (newPassword !== newRePassword) {
			answ.status = false;
			answ.fields.push('newPassword', 'newRePassword');
		}
		return answ;
	}

	async getSettingAndRenderSettingModal() {
		const response = await this.model.getSettingUser();
		if (response.status) {
			this.view.renderSettingModal(this.handlerAccountSetting.bind(this), this.handlerCloseModal.bind(this), response.data);
			this.view.closeSubmenu();
		} else {
			this.logOut();
			this.view.renderLogInModal(this.handlerAuthorization.bind(this), this.handlerCloseModal.bind(this));
		}
	}

	handlerCloseModal() {
		this.view.closeModal();
	}

	logOut() {
		this.view.renderNoAuthMenu();
		this.view.closeSubmenu();
		this.model.clearAuth();
		this.publisher.publish("logout");
	}

	handlerNoAuthGlobalEvent() {
		this.view.renderLogInModal(this.handlerAuthorization.bind(this), this.handlerCloseModal.bind(this));
	}
}
