const registerForm = document.getElementById("register");

// HANDLE REGISTRATION

const full_name = document.querySelector(".full_name");
const email = document.querySelector(".email");
const phone_number = document.querySelector(".phone_number");
// const txtprofile = document.querySelector('.txtprofile')
const password = document.querySelector(".password");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log(profileurl);
  let user =
    full_name.value !== "" &&
    email.value !== "" &&
    password.value !== "" &&
    phone_number.value !== "";

  if (user) {
    axios
      .post(
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
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = "./login.html";
      })
      .catch((e) => {
        console.log(e);
      });
  }
});
