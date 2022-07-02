var username;

let continueBtn = document.getElementById("continue-btn");

// SEQUENCE //

continueBtn.addEventListener("click", readUsername);

// FUNCTIONS //

// console.log but shorter

// read username on click continueBtn
function readUsername() {
  let readVal = document.getElementById("username-field").value;
  if (readVal == "") {
    loginError("Enter your name");
  } else {
    username = readVal;
    document.getElementById("select-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
  }
}

function shake(object) {
  // code here
}

function loginError(message) {
  let notifArea = document.getElementById("notif-area");
  notifArea.innerHTML = "Enter your name";
}
