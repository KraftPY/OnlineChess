import { AuthorizationTemplate } from './AuthorizationTemplate.js';

export class AuthorizationView {
	constructor(hendlers) {
		this.handlers = hendlers;
		this.submenuBlock = document.querySelector('.auth_submenu');
		this.authBtn = document.querySelector('.auth_btn');
		this.modal = {
			mainModal: null,
			loginForm: null,
			signupForm: null,
			settingForm: null,
		};
		this.isOpenSubMenu = false;
		this.init();
	}

	init() {
		const { handlerNoAuthMenu, handlerAuthMenu, handlerSubmenu, handlerMainModal, handlerBody } = this.handlers;

		this.authBtn.addEventListener('click', handlerSubmenu);

		// create main modal
		this.modal.mainModal = document.createElement('div');
		this.modal.mainModal.classList.add('main_modal');
		this.modal.mainModal.addEventListener('mousedown', handlerMainModal);

		// create 2 block with list menu
		this.accDropMenu = {
			auth: document.createElement('div'),
			noAuth: document.createElement('div'),
		};
		this.accDropMenu.auth.innerHTML = AuthorizationTemplate.getAuthList();
		this.accDropMenu.noAuth.innerHTML = AuthorizationTemplate.getNoAuthList();

		this.accDropMenu.noAuth.addEventListener('click', handlerNoAuthMenu);
		this.accDropMenu.auth.addEventListener('click', handlerAuthMenu);

		// add eventlistener on body for close submenu
		document.body.addEventListener('mousedown', handlerBody);
	}

	renderNoAuthMenu() {
		this.submenuBlock.innerHTML = '';
		this.submenuBlock.classList.toggle('none');
		this.submenuBlock.append(this.accDropMenu.noAuth);
		this.isOpenSubMenu = true;
	}

	renderAuthMenu(name) {
		this.submenuBlock.innerHTML = '';
		this.submenuBlock.classList.toggle('none');
		this.submenuBlock.append(this.accDropMenu.auth);
		document.querySelector('.user_name').innerHTML = `Hello, ${name}`;
		this.isOpenSubMenu = true;
	}

	renderLogInModal(handlerAuthorization, handlerCloseModal) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalLogIn();
		document.body.prepend(this.modal.mainModal);
		const form = document.querySelector('.login_form');
		const closeBtn = document.querySelectorAll('.close_form');
		form.addEventListener('submit', handlerAuthorization);
		closeBtn.forEach(btn => btn.addEventListener('click', handlerCloseModal));
	}

	renderSignUpModal(handlerRegistration, handlerCloseModal) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalSignUp();
		document.body.prepend(this.modal.mainModal);
		const form = document.querySelector('.signup_form');
		const closeBtn = document.querySelectorAll('.close_form');
		form.addEventListener('submit', handlerRegistration);
		closeBtn.forEach(btn => btn.addEventListener('click', handlerCloseModal));
	}

	renderSettingModal(handlerAccountSetting, handlerCloseModal, userData) {
		this.modal.mainModal.innerHTML = AuthorizationTemplate.getModalSetting(userData);
		document.body.prepend(this.modal.mainModal);
		const form = document.querySelector('.setting_form');
		const closeBtn = document.querySelectorAll('.close_form');
		form.addEventListener('submit', handlerAccountSetting);
		closeBtn.forEach(btn => btn.addEventListener('click', handlerCloseModal));
	}

	showValidFields(formElem, response) {
		// убираем у всех инпутов invalid css class
		[...formElem].forEach(el => el.classList.toggle('invalid', false));
		// скрыаем все блоки-подсказки
		document.querySelectorAll('.invalid_feedback').forEach(el => el.classList.add('none'));
		// добавляем инпутам которые не прошли валидации invalid и показывае блок-подсказку этого инпута
		response.fields.forEach(el => {
			formElem[el].classList.add('invalid');
			if (this.modal.mainModal.children[0].dataset.name != 'login') {
				formElem[el].nextElementSibling.classList.remove('none');
			}
		});
		// выводим сообщение от сервера в блоке-статусе формы и меняем кнопки (только при создании нового аккаунта)
		if (response.msg) {
			const regStatus = document.querySelector('.srv_msg');
			regStatus.innerHTML = response.msg;
			if (response.status) {
				regStatus.classList.toggle('text_error', false);
				regStatus.classList.add('text_success');
				if (this.modal.mainModal.children[0].dataset.name != 'login') {
					document.querySelector('.btn_close').classList.remove('none');
					document.querySelector('.btn_sign').classList.add('none');
				}
			} else {
				regStatus.classList.toggle('text_success', false);
				regStatus.classList.add('text_error');
			}
		}
	}

	closeSubmenu() {
		this.submenuBlock.classList.add('none');
		this.isOpenSubMenu = false;
	}

	closeModal() {
		this.modal.mainModal.remove();
	}
}
