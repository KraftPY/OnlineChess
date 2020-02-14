import { AuthorizationTemplate } from './AuthorizationTemplate.js';

export class AuthorizationView {
	constructor(arg) {
		this.headerDOM = {
			logInLink: document.querySelector('.log_in_link'),
			accountSettingLink: document.querySelector('.account_setting_link'),
			signUpLink: document.querySelector('.sign_up_link'),
			authModal: document.querySelector('.auth_modal')
		};
		this.addListeners(arg);
	}

	addListeners({ handlerLogIn, handlerAccountSetting, handlerSignUp }) {
		this.headerDOM.logInLink.addEventListener('click', handlerLogIn);
		this.headerDOM.accountSettingLink.addEventListener('click', handlerAccountSetting);
		this.headerDOM.signUpLink.addEventListener('click', handlerSignUp);
	}

	renderLogInModal() {
		this.headerDOM.authModal.innerHTML = AuthorizationTemplate.getModalLogIn();
	}

	renderSignUpModal(handlerRegistration) {
		this.headerDOM.authModal.innerHTML = AuthorizationTemplate.getModalSignUp();
		document.querySelector('.btn_sign_up').addEventListener('submit', handlerRegistration);
	}
}
