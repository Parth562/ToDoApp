import { login, logout, signUp, addTask, removeTask } from './login.js';

const loginForm = document.getElementById('login__form');
const logoutBtn = document.getElementById('logout__button');
const items = document.querySelectorAll('.circle');
const taskForm = document.getElementById('task__form');
const crossImages = document.querySelectorAll('#cross_button');
const signUpForm = document.getElementById('signup__form');

if (loginForm)
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    e.target[2].textContent = 'Please wait...';
    try {
      await login(email, password);
    } catch {
      alert('invalid email or password');
      e.target[2].textContent = 'Login';
    }
  });

if (logoutBtn)
  logoutBtn.addEventListener('click', (e) => {
    logout();
  });

items.forEach((item) => {
  item.addEventListener('click', (e) => {
    item.classList.toggle('checked');
  });
});

if (taskForm) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = e.target[0].value;
    e.target[0].value = '';
    addTask(taskName);
  });
}

crossImages.forEach((crossImage) => {
  crossImage.addEventListener('click', (e) => {
    const taskName = crossImage.previousSibling.textContent;
    removeTask(taskName);
  });
});

if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const passwordConfirm = e.target[3].value;

    e.target[4].textContent = 'Signing up...';

    await signUp(name, email, password, passwordConfirm);
  });
}
