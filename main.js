// Variables //
var username;

// DOM constants //
const continueBtn = document.getElementById("continue-btn");

// SEQUENCE //

continueBtn.addEventListener("click", readUsername);

// FUNCTIONS //

// read username on click continueBtn
function readUsername() {
  let loginSection = document.getElementById("login-section");

  // read name from field
  let readVal = document.getElementById("username-field").value;
  if (readVal == "") {
    loginError("Enter your name");
    // shake on error
    shake(loginSection);
  } else {
    username = readVal;
    let selectSection = document.getElementById("select-section");
    selectSection.style.display = "block";
    document.getElementById("login-section").style.display = "none";
    fadeIn(selectSection);
  }
}

// display error msg on notif area
// in login section
function loginError(message) {
  let notifArea = document.getElementById("notif-area");
  notifArea.innerHTML = "Enter your name";
}

// ANIMATIONS JS

// shake object on error
// pass the object to shake as argument
function shake(object) {
  object.classList.add("shake");
  setTimeout(function () {
    if (object.classList.contains("shake")) {
      object.classList.remove("shake");
    }
  }, 400);
}

// fade in
function fadeIn(object) {
  object.classList.add("fade-in");
}
