const loginpassword = document.querySelector('.password');
const loginemail = document.querySelector('.email');
const loginForm = document.getElementById('login');

const regError = document.querySelector('.regError');

let token = '';
let id = '';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userlogin =
        loginemail.value !== '' &&
        loginpassword.value !== '';

    if (userlogin) {
        axios.post(
            "http://localhost:4500/users/login",
            {
                email: loginemail.value,
                password: loginpassword.value,
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
            }
        ).then((res) => {
            console.log(res.data);
            regError.innerHTML = ''; // Clear any previous error message
            
            id = res.data.id;
            localStorage.setItem('id', id);
            token = res.data.token;
            localStorage.setItem('token', token);

            // Display a success message
            regError.innerHTML = 'Login successful! Redirecting...';

            if (res.data.role === 'admin') {
                window.location.href = './adminAllProducts.html';
            } else if (res.data.role !== 'admin') {
                window.location.href = './yourProducts.html';
            }
        }).catch((error) => {
            console.error('An error occurred:', error);

            // Display the error message in the regError element
            if (error.response && error.response.data && error.response.data.message) {
                regError.innerHTML = error.response.data.message;
            } else {
                regError.innerHTML = 'An unknown error occurred.';
            }
        });
    }

});
