//*  signup variables
let signUPName = document.getElementById("name");
let signUPEmail = document.getElementById("email");
let signUpPassword = document.getElementById("password");
let signUpButton = document.getElementById("signUp");
let userMessage = document.getElementById("userMessage");
let allUsers = [];
checkLocalStorage();

//*  signin variables
let signEmailInput = document.getElementById("signEmail");
let signPassInput = document.getElementById("signPass");
let signInButton = document.getElementById("login");
let userName;

//*  global
//! Select all input to change background color when inputs contains data
let allInputFeild = document.querySelectorAll("input");
for (let i = 0; i < allInputFeild.length; i++) {
  allInputFeild[i].addEventListener("blur", function (e) {
    if (e.target.value !== "") {
      console.log("hi");
      e.target.classList.remove("bg-transparent");

      e.target.classList.add("bg-white");
    }
  });
}

//*  signup operaror
signUpButton?.addEventListener("click", function () {
  if (checkEmptyINputs() == false) {
    if (exist() == true) {
      existing();
    } else if (exist() == false) {
      let user = {
        name: signUPName.value,
        email: signUPEmail.value,
        password: signUpPassword.value,
      };

      allUsers.push(user);
      localStorage.setItem("users", JSON.stringify(allUsers));
      goToSigninPage();
    }
  } else if (checkEmptyINputs() == true) {
    userMessage.innerHTML = "All inputs is required";
  }
});

//* signin operator
signInButton?.addEventListener("click", function () {
  if (checkLoginEmpty() == true) {
    inputRequired();
  } else {
    if (checkIsLoginExist() == true) {
      SuccessMessage();
      goToHomePg();
    } else if (checkIsLoginExist() == false) {
      invalidData();
    }
  }
});

//~ check if the inputs empty
function checkEmptyINputs() {
  if (
    signUPName.value == "" ||
    signUPEmail.value == "" ||
    signUpPassword.value == ""
  ) {
    inputRequired();
    return true;
  } else {
    SuccessMessage();

    return false;
  }
}

//~ check if registered email is exist in local localstorage
function exist() {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === signUPEmail.value) {
      console.log("used");
      return true; // Return true if a match is found
    }
  }
  console.log("good");
  return false; // Return false only after checking all users
}

//~ check if local empty or not
function checkLocalStorage() {
  if (localStorage.getItem("users") !== null) {
    allUsers = JSON.parse(localStorage.getItem("users"));
  } else {
    allUsers = [];
  }
}

//? show  Success Message
function SuccessMessage() {
  userMessage.innerHTML = "Success";
  userMessage.classList.remove("text-danger", "text-warning");
  userMessage.classList.add("success");
}

//! show  input requierd Message
function inputRequired() {
  userMessage.innerHTML = "All inputs is required";
  userMessage.classList.add("text-danger");
  userMessage.classList.remove("success", "text-warning");
  userMessage.classList.add("mb-3");
}

//^ show  existing   Message
function existing() {
  userMessage.innerHTML = `This email already exists. Please try a different one.`;
  userMessage.classList.remove("text-danger", "success");
  userMessage.classList.add("text-warning");
}

//! show invalid data message
function invalidData() {
  userMessage.innerHTML = `Invalid email or password. Please try again.`;
  userMessage.classList.add("text-danger");
  userMessage.classList.remove("success", "text-warning");
  userMessage.classList.add("mb-3");
}

//~ send user to homepage after succesfull sign in
function goToHomePg() {
  window.location.href = "homePage.html";
}

//~ send user to signin page after succesfull Create Email
function goToSigninPage() {
  window.location.href = "index.html";
}

//~ check if signin inputs is empty
function checkLoginEmpty() {
  if (signEmailInput.value !== "" && signPassInput.value !== "") {
    return false;
  } else {
    return true;
  }
}

//~ check if signed in email is exist in local localstorage
function checkIsLoginExist() {
  for (let i = 0; i < allUsers.length; i++) {
    index = i;
    if (
      signEmailInput.value.toLowerCase() == allUsers[i].email.toLowerCase() &&
      signPassInput.value == allUsers[i].password
    ) {
      var username = allUsers[i].name;

      localStorage.setItem("homeName", JSON.stringify(username));
      console.log(username);
      return true;
    }
  }
  return false;
}
//~ show the signedIn user name
function welcoming() {
  let WelcomeUser = document.getElementById("welcomeUser");
  let tName = localStorage.getItem("homeName");
  WelcomeUser.innerHTML = tName.replace(/^"(.+(?="$))"$/, "$1"); //! regex to remove double qoute "" from the output
}

//~ method to make this function  work only when the user become in home page
//! not show errors in other pages
if (document.title == "Home") {
  welcoming();
}
