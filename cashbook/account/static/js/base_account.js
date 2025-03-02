document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === '') {
        alert('Please enter a username');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // Here you would typically send the data to your server
    console.log('Login attempted with:', { username, password });
});

const showHidePass = document.getElementById('showHidePassword');
const userPassword = document.getElementById('password');

showHidePass.addEventListener('click', function(e) {
    let showHideAttr = userPassword.getAttribute('type');
    if (showHideAttr === 'password') {
        userPassword.setAttribute('type', 'text');
        showHidePass.classList.remove('fa-eye');
        showHidePass.classList.add('fa-eye-slash');
    } else {
        userPassword.setAttribute('type', 'password');
        showHidePass.classList.remove('fa-eye-slash');
        showHidePass.classList.add('fa-eye');
    }
});
