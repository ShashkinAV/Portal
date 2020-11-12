// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector("#menu-toggle");
// Создаем переменную, в которую положим меню
let menu = document.querySelector(".sidebar");
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener("click", function (event) {
	// отменяем стандартное поведение ссылки
	event.preventDefault();
	// вешаем класс на меню, когда кликнули по кнопке меню
	menu.classList.toggle("visible");
});

const loginbar = document.querySelector(".login");
const emailInput = document.querySelector(".login-email");
const passInput = document.querySelector(".login-password");
const form = document.querySelector(".login-form");
const loginSignup = document.querySelector(".login-regist");
const errorEmail = document.querySelector(".email-error");
const userBar = document.querySelector(".user");
const userNameProfile = document.querySelector(".user-name");
const exitBtn = document.querySelector(".exit");

const toggleAuth = ()=> {
	const user = setUsers.user;

	if(user) {
		loginbar.style.display = "none";
		userBar.style.display = "flex";
		userNameProfile.innerHTML = user.displayName;

	} else {
		loginbar.style.display = "block";
		userBar.style.display = "none";
	}
}
const renameDisplayName = (email) => {
	const name = email.split('@');
	return name[0];
}
const validateEmail = (email) => {
	const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if(reg.test(email)){
		
	}
}

const users = [
	{
		email: "asd123@ru.ru",
		password: "123456",
		displayName: "Anton",
	},
	{
		email: "qwerty@ru.ru",
		password: "123456",
		displayName: "Micke",
	},
];
const setUsers = {
	user: null,
	login(email, password, handler) {
		const user = this.getUser(email);
		if(user && user.password === password) {
			this.authorizedUser(user);
			handler();
		} else {
			errorEmail.style.display = "block";
			errorEmail.innerHTML = "Пароль неверный, попробуйте еще раз!";
		}
	},
	logOut() {
		console.log("Выход");
	},
	signUp(email, password, handler) { 

		const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if(!email.trim() || !password.trim()){

			errorEmail.style.display = "block";
			errorEmail.innerHTML = "Введите корректные данные!";

			return;
		}
			if(!reg.test(email)){
				errorEmail.style.display = "block";
				errorEmail.innerHTML = "Введите правильный email!!";
				return;
			}
			
		if(!this.getUser(email)) {
			const user = {email, password, displayName: renameDisplayName(email)}
			users.push(user);
			this.authorizedUser(user);
			handler();
		} else {
			errorEmail.style.display = "block";
			errorEmail.innerHTML = "Такой пользователь уже зарегестрирован!";
		}
	},
	getUser(email) {
		return users.find(item => item.email === email); //ищем юзера по емаил и сравниваем с введенным в инпуте
	},
	authorizedUser(user) {
		this.user = user;
	}
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const email = emailInput.value;
	const password = passInput.value;

	setUsers.login(email, password, toggleAuth);

});
loginSignup.addEventListener("click", (e) => {
	e.preventDefault();

	const email = emailInput.value;
	const password = passInput.value;

	setUsers.signUp(email, password, toggleAuth, renameDisplayName);
	form.reset();

});
exitBtn.addEventListener('click', (e)=> {
	e.preventDefault();

	loginbar.style.display = "";
	userBar.style.display = "none";
	errorEmail.style.display = "none";
	form.reset();
})
toggleAuth();

