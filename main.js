// Variables //
var username;
const options = []; //array to hold options

window.addEventListener("load", (event) => {
  if (getCookie("username")) {
    transition("splash-section", "main-section");
  } else {
    transition("splash-section", "login-section");
  }
});

// DOM constants //
let continueBtn = document.getElementById("continue-btn");
let detailsBtn = document.getElementById("details-continue-btn");
let detailsBackBtn = document.getElementById("details-back-btn");
let mainBackBtn = document.getElementById("main-back-btn");
let logOutBtn = document.getElementById("logout-btn");

// SEQUENCE //

continueBtn.addEventListener("click", readUsername);
detailsBtn.addEventListener("click", readDetails);

// back buttons
//back btn in details section
detailsBackBtn.addEventListener("click", function () {
  transition("details-section", "login-section");
});
// back btn in main section
mainBackBtn.addEventListener("click", function () {
  transition("main-section", "details-section");
});

// logout button
logOutBtn.addEventListener("click", function () {
  logOut();
  transition("main-section", "login-section");
});

//////////// FUNCTIONS ////////////

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

    // transition to next page
    transition("login-section", "details-section");
  }
}

// read details and (save them to cookies) -> at last
function readDetails() {
  let detailsSection = document.getElementById("details-section");

  options[0] = document.getElementById("select-fac").value;
  options[1] = document.getElementById("select-year").value;
  options[2] = document.getElementById("select-grp").value;

  if (checkVals() == 1) {
    shake(detailsSection);
    detailsError("Select options for all");
  } else {
    // save details to cookies
    setDetails(options);

    // transition to next page
    transition("details-section", "main-section");
  }

  // to check if options are 0
  function checkVals() {
    for (i = 0; i < options.length; i++) {
      if (options[i] == 0) {
        return 1;
      } else {
        continue;
      }
    }
  }
}

// transition
// page1 = current page id
// page2 = next page id
function transition(page1, page2) {
  let object1 = document.getElementById(page1);
  let object2 = document.getElementById(page2);
  object2.style.display = "flex";
  object1.style.display = "none";
  fadeIn(object2);
}

function logOut() {
  delCookie("username");
  delCookie("faculty");
  delCookie("year");
  delCookie("group");
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

// delete cookie
function delCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// get a cookie by name
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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
// function backToLogin() {
//   let loginSection = document.getElementById("login-section");
//   document.getElementById("login-section").style.display = "flex";
//   document.getElementById("details-section").style.display = "none";
//   fadeIn(loginSection);
// }

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
