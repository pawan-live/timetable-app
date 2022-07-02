// Variables //
var username;

// DOM constants //
const continueBtn = document.getElementById("continue-btn");
const detailsBtn = document.getElementById("details-continue-btn");

// SEQUENCE //

continueBtn.addEventListener("click", readUsername);
detailsBtn.addEventListener("click", readDetails);

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
    let detailsSection = document.getElementById("details-section");
    detailsSection.style.display = "flex";
    document.getElementById("login-section").style.display = "none";
    fadeIn(detailsSection);
  }
}

// read details
function readDetails() {
  let detailsSection = document.getElementById("details-section");

  const options = []; //array to hold options
  options[0] = document.getElementById("select-fac").value;
  options[1] = document.getElementById("select-year").value;
  options[2] = document.getElementById("select-grp").value;

  for (i = 0; i < options.length; i++) {
    if (options[i] == 0) {
      shake(detailsSection);
      console.log("done");
      break;
    }
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
  setTimeout(function () {
    if (object.classList.contains("fade-in")) {
      object.classList.remove("fade-in");
    }
  }, 400);
}
