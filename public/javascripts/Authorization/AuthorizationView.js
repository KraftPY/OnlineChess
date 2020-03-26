import { AuthorizationTemplate } from './AuthorizationTemplate.js';

export class AuthorizationView {
	constructor(hendlers) {
		this.handlers = hendlers;
		this.mainMenu = document.querySelector('.account_drop_menu');
		this.modal = {
			mainModal: document.createElement('div'),
			loginForm: null,
			signupForm: null,
			settingForm: null,
		};
		this.init();
	}

	init() {
		const { handlerLogIn, handlerNoAccountSetting, handlerAccountSetting, handlerSignUp, handlerLogOut } = this.handlers;

		// create 2 block with list menu
		this.accDropMenu = {
			auth: document.createElement('div'),
			noAuth: document.createElement('div'),
		};
		this.accDropMenu.auth.innerHTML = AuthorizationTemplate.getAuthList();
		this.accDropMenu.noAuth.innerHTML = AuthorizationTemplate.getNoAuthList();

		this.accDropMenu.noAuth.addEventListener('click', (ev) => {
			ev.preventDefault();
			switch (true) {
				case ev.target.dataset.name == 'log_in':
					handlerLogIn();
					break;
				case ev.target.dataset.name == 'no_setting':
					handlerNoAccountSetting();
					break;
				case ev.target.dataset.name == 'sign_in':
					handlerSignUp();
					break;
			}
		});

		this.accDropMenu.auth.addEventListener('click', (ev) => {
			ev.preventDefault();
			switch (true) {
				case ev.target.dataset.name == 'setting':
					handlerAccountSetting();
					break;
				case ev.target.dataset.name == 'log_out':
					handlerLogOut();
					break;
			}
		});
	}

	renderNoAuthMenu() {
		this.mainMenu.innerHTML = '';
		this.mainMenu.append(this.accDropMenu.noAuth);
	}

	renderAuthMenu(name) {
		this.mainMenu.innerHTML = '';
		this.mainMenu.append(this.accDropMenu.auth);
		document.querySelector('.user_name').innerHTML = `Hello, ${name}`;
	}

	renderLogInModal(handlerAuthorization) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalLogIn();
		document.body.prepend(this.modal.mainModal);
		this.modal.loginForm = document.querySelector('.login_form');
		this.modal.loginForm.addEventListener('submit', handlerAuthorization);
	}

	renderSignUpModal(handlerRegistration) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalSignUp();
		document.body.prepend(this.modal.mainModal);
		this.modal.signupForm = document.querySelector('.signup_form');
		this.modal.signupForm.addEventListener('submit', handlerRegistration);
	}

	renderSettingModal(data) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getTest();
		// this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalSignUp();
		document.body.prepend(this.modal.mainModal);
		// this.modal.settingForm = document.querySelector('.setting_form');

		console.log(data);
	}

	showValidFields(formElem, response) {
		[...formElem].forEach(el => el.classList.toggle('is-invalid', false));
		response.fields.forEach(el => formElem[el].classList.add('is-invalid'));
		if (response.msg) {
			const regStatus = document.querySelector('.srvMsg');
			regStatus.innerHTML = response.msg;
			if (response.status) {
				regStatus.classList.toggle('text-danger', false);
				regStatus.classList.add('text-success');
				if (this.modal.signupForm) {
					document.querySelector('.btn_close').classList.remove('none');
					document.querySelector('.btn_sign_up').classList.add('none');
				}
			} else {
				regStatus.classList.toggle('text-success', false);
				regStatus.classList.add('text-danger');
			}
		}
	}

	closeModal() {
		document.querySelector('.close').click();
	}
}
