import { AuthorizationTemplate } from './AuthorizationTemplate.js';

export class AuthorizationView {
	constructor(arg) {
		this.headerDOM = {
			logInLink: document.querySelector('.log_in_link'),
			accountSettingLink: document.querySelector('.account_setting_link'),
			signUpLink: document.querySelector('.sign_up_link')
		};
		this.modal = {
			mainModal: document.createElement('div'),
			loginForm: null,
			signupForm: null,

		};
		this.addListeners(arg);
	}

	addListeners({ handlerLogIn, handlerAccountSetting, handlerSignUp }) {
		this.headerDOM.logInLink.addEventListener('click', handlerLogIn);
		this.headerDOM.accountSettingLink.addEventListener('click', handlerAccountSetting);
		this.headerDOM.signUpLink.addEventListener('click', handlerSignUp);
	}

	renderLogInModal(handlerAuthorization) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalLogIn();
		document.body.prepend(this.modal.mainModal);
		this.loginForm = document.querySelector('.login_form');
		this.loginForm.addEventListener('submit', handlerAuthorization);
	}

	renderSignUpModal(handlerRegistration) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalSignUp();
		document.body.prepend(this.modal.mainModal);
		this.signupForm = document.querySelector('.signup_form');
		this.signupForm.addEventListener('submit', handlerRegistration);
	}

	closeModal(handler) {
		if (this.signupForm) {
			this.signupForm.removeEventListener('submit', handler);
			this.signupForm = null;
		} else if (this.loginForm) {
			this.loginForm.removeEventListener('submit', handler);
			this.loginForm = null;
		}
		this.modal.mainModal.remove();
		document.body.classList.remove('modal-open');
	}
}
