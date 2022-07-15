// Variables //
var username;
const options = []; //array to hold options

window.addEventListener("load", (event) => {
  if (getCookie("username")) {
    username = getCookie("username");
    displayUserData();
    transition("splash-section", "main-section");
  } else {
    transition("splash-section", "login-section");
    document.getElementById("username-field").focus();
  }
});

var keys = [];
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => (keys = data));

// DOM constants //
let continueBtn = document.getElementById("continue-btn");
let detailsBtn = document.getElementById("details-continue-btn");
let detailsBackBtn = document.getElementById("details-back-btn");
let mainBackBtn = document.getElementById("main-back-btn");
let logOutBtn = document.getElementById("logout-btn");
let username_field = document.getElementById("username-field");

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
  location.reload();
  // transition("main-section", "login-section");
});

// details section >> fetch optins from databse and display within html
let select_fac = document.getElementById("select-fac");
let select_year = document.getElementById("select-year");
let select_1 = document.getElementById("select-1");

select_fac.addEventListener("change", function () {
  let selected = select_fac.value;

  if (selected == "Select") {
    select_year.value = 0;
    select_1.value = "0";
    select_year.disabled = true;
    select_1.disabled = true;
  } else {
    let resultArr = Object.keys(keys.fac[selected]); // data from JSON
    let html_content = '<option value="0">Select</option>';
    resultArr.forEach((element) => {
      html_content +=
        '<option value="' + element + '">' + element + "</option>";
    });

    select_year.innerHTML = html_content;
    select_year.disabled = false;
  }
});

select_year.addEventListener("change", function () {
  let faculty = select_fac.value;
  let selected = select_year.value;

  // if selected 'select'
  if (selected == "0") {
    select_1.disabled = true;
    // select_1.value = "";
  } else {
    let resultArr = Object.keys(keys.fac[faculty][selected]);
    if (resultArr == "") {
      select_1.disabled = true;
      select_1.value = "0";
    } else {
      let html_content = '<option value="0">Select</option>';
      resultArr.forEach((element) => {
        html_content +=
          '<option value="' + element + '">' + element + "</option>";
      });
      select_1.innerHTML = html_content;
      select_1.disabled = false;
    }
  }
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
    // get faculty list from JSON object and add to the dropdown list
    getFacList();
  }

  // get faculty list from JSON obj
  function getFacList() {
    let html_content = '<option value="Select">Select</option>';
    let array = Object.keys(keys.fac);
    array.forEach((element) => {
      html_content +=
        '<option value="' + element + '">' + element + "</option>";
    });
    select_fac.innerHTML = html_content;
  }
}

// read details and (save them to cookies) -> at last
function readDetails() {
  let detailsSection = document.getElementById("details-section");

  options[0] = document.getElementById("select-fac").value;
  options[1] = document.getElementById("select-year").value;
  options[2] = document.getElementById("select-1").value;

  if (checkVals() == 1) {
    shake(detailsSection);
    detailsError("Select options for all");
  } else {
    // save details to cookies
    setDetails(options);
    displayUserData();
    // transition to next page
    transition("details-section", "main-section");
  }

  // load values from db and display

  // to check if options are 0
  function checkVals() {
    for (i = 0; i < options.length; i++) {
      if (options[i] == 0 || options[i] == "Select") {
        return 1;
      } else {
        continue;
      }
    }
  }
}

// function to fetch data from database

// function to write metadata
function displayUserData() {
  console.log("called");
  // username = getCookie("username");
  // get time
  var myDate = new Date();
  var hrs = myDate.getHours();
  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";

  // display time
  document.getElementById("greeting-wish").innerText = greet;
  document.getElementById("greeting-username").innerText = username;
  displayCards();
}

function displayCards() {
  let num = table.day.monday.length;
  let html_content = "";

  for (i = 0; i < num; i++) {
    html_content +=
      '<div class="card timecard" id="card' +
      (i + 1) +
      '">' +
      '<div class="row">' +
      '<p class="title">' +
      table.day.monday[i].module +
      "</p>" +
      '<p class="type">' +
      table.day.monday[i].type +
      "</p>" +
      "</div>" +
      '<div class="row">' +
      '<p class="time">' +
      table.day.monday[i].start +
      " - " +
      table.day.monday[i].end +
      "</p>" +
      "</div>" +
      "</div>";
  }
  document.getElementById("cards-container").innerHTML = html_content;
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
