import { AuthorizationView } from './AuthorizationView.js';
import { AuthorizationModel } from './AuthorizationModel.js';

export class AuthorizationController {
	constructor() {
		this.viewArg = {
			handlerLogIn: this.handlerLogIn.bind(this),
			handlerAccountSetting: this.handlerAccountSetting.bind(this),
			handlerSignUp: this.handlerSignUp.bind(this)
		};
		this.view = new AuthorizationView(this.viewArg);
		this.model = new AuthorizationModel();
	}

	handlerLogIn() {
		event.preventDefault();
		this.view.renderLogInModal();
	}

	handlerAccountSetting() {
		event.preventDefault();
	}

	handlerSignUp() {
		event.preventDefault();
		this.view.renderSignUpModal(this.handlerRegistration.bind());
	}

	handlerRegistration(ev) {
		console.log(ev);

		// this.model.regNewUser(newUser);
	}
}
