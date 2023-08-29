const loginpassword = document.querySelector('.password');
const loginemail = document.querySelector('.email');
const loginForm = document.getElementById('login');
const toast = document.getElementById("toast");
const toastText = document.getElementById("toast-text");

function showToast(message) {
    toast.style.display = "block";
    toastText.textContent = message;
    toast.style.right = "20px";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

// const regError = document.querySelector('.regError');

let token = '';
let id = '';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let userlogin =
        loginemail.value !== '' &&
        loginpassword.value !== '';

    if (!userlogin) {
        showToast("Please fill in all the input fields.");
        return;
    }

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
            // regError.innerHTML = ''; // Clear any previous error message

            id = res.data.id;
            localStorage.setItem('id', id);
            token = res.data.token;
            localStorage.setItem('token', token);

            // Display a success message
            // regError.innerHTML = 'Login successful! Redirecting...';
            showToast("Login successful! Redirecting...");

            if (res.data.role === 'admin') {
                window.location.href = './adminAllProducts.html';
                return;

            } else if (res.data.role !== 'admin') {
                window.location.href = './yourProducts.html';
                return;
            }
            
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                if (error.response.data.message === "Account is deactivated") {
                    // Handle the deactivated account error
                    showToast("Account is deactivated. Please contact support at 0707451644");
                } else {
                    showToast(error.response.data.message);
                }
            } else {
                console.error('An error occurred:', error);
                showToast('An unknown error occurred.');
            }
        });
    }
});
