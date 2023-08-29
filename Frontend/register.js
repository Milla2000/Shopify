
const registerForm = document.getElementById("register");
const full_name = document.querySelector(".full_name");
const email = document.querySelector(".email");
const phone_number = document.querySelector(".phone_number");
const password = document.querySelector(".password");
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

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = full_name.value !== "" && email.value !== "" && password.value !== "" && phone_number.value !== "";

  if (!user) {
    showToast("Please fill in all the input fields.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:4500/users/register",
      {
        username: full_name.value,
        email: email.value,
        password: password.value,
        phone_number: phone_number.value,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    );
    console.log(response.data);
    window.location.href = "./login.html";
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.includes(
        "Violation of UNIQUE KEY constraint"
      )
    ) {
      // console.log("Email already exists. Please choose a different email.");
      showToast("Email already exists. Please choose a different email.");
    }

    else if (
      error.response &&
      error.response.data &&
      Array.isArray(error.response.data) &&
      error.response.data.length > 0 &&
      error.response.data[0].type === "string.min" &&
      error.response.data[0].context &&
      error.response.data[0].context.limit === 8 &&
      error.response.data[0].context.key === "password"
    ) {
      // console.log("Password must be at least 8 characters long.");
      showToast("Password must be at least 8 characters long.");
    }

    else if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.includes("Invalid number")
    ) {
      // console.log("Invalid phone number format.");
      showToast("Invalid phone number format.");
    } else if (
      error.response &&
      error.response.data &&
      Array.isArray(error.response.data) &&
      error.response.data.length > 0 &&
      error.response.data[0].type === "string.min" &&
      error.response.data[0].context &&
      error.response.data[0].context.limit === 5 && // Check for username length
      error.response.data[0].context.key === "username"
    ) {
      showToast("Username must be at least 5 characters long.");
    }


    else if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.includes("Value must be between")
    ) {
      // console.log("Phone number is out of the allowed range.");
      showToast("Phone number is out of the allowed range.");
    } else {
      console.log("An error occurred:", error);
    }
  }
});

