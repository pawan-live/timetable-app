// Variables //
var username;
const options = []; //array to hold options

// DOM constants //
const continueBtn = document.getElementById("continue-btn");
const detailsBtn = document.getElementById("details-continue-btn");
const backBtn = document.getElementById("back-btn");

// SEQUENCE //

continueBtn.addEventListener("click", readUsername);
detailsBtn.addEventListener("click", readDetails);
backBtn.addEventListener("click", backToLogin);

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

  options[0] = document.getElementById("select-fac").value;
  options[1] = document.getElementById("select-year").value;
  options[2] = document.getElementById("select-grp").value;

  for (i = 0; i < options.length; i++) {
    if (options[i] == 0) {
      shake(detailsSection);
      detailsError("Select options for all");
      break;
    } else if (options[i] != 0) {
      continue;
    }
  }
  setDetails(options);

  // move to next screen
  let mainSection = document.getElementById("main-section");
  mainSection.style.display = "flex";
  document.getElementById("details-section").style.display = "none";
  fadeIn(mainSection);
}

// set details to cookies
function setDetails(options) {
  setCookie("username", username, 90);
  setCookie("faculty", options[0], 90);
  setCookie("year", options[1], 90);
  setCookie("group", options[2], 90);
}

// set a cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// display error msg on notif area
// in login section
function loginError(message) {
  let loginNotifArea = document.getElementById("login-notif-area");
  loginNotifArea.innerHTML = message;
}
// in login section
function detailsError(message) {
  let detailsNotifArea = document.getElementById("details-notif-area");
  detailsNotifArea.innerHTML = message;
}

// go back to login section
function backToLogin() {
  let loginSection = document.getElementById("login-section");
  document.getElementById("login-section").style.display = "flex";
  document.getElementById("details-section").style.display = "none";
  fadeIn(loginSection);
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
