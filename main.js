// Variables //
var username;
const options = []; //array to hold options

var faculty, year, semester, spec, sub; // read values

const weekday = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const d = new Date();
// let dayToday = weekday[d.getDay()];
let dayToday = "friday";

window.addEventListener("load", (event) => {
  if (getCookie("username")) {
    username = getCookie("username");
    faculty = getCookie("faculty");
    year = getCookie("year");
    semester = getCookie("semester");
    spec = getCookie("spec");
    sub = getCookie("sub");

    displayUserData();
    displayTable();
    transition("splash-section", "main-section");
  } else {
    transition("splash-section", "login-section");
    document.getElementById("username-field").focus();
  }
});

// data structure
// keys.fac.FOC.Y2.S1.SE.table.tuesday[2]
// keys.fac.<faculty>.<year>.<sem>.<spec>.table.<dayToday>

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
let select_2 = document.getElementById("select-2");
let select_3 = document.getElementById("select-3");

/**
 * SELECTION DROPDOWN MENUS
 *
 * This works by fetching data from the JSON object in data.json file
 * the data is fetched in the order >>
 * faculty > year > semester > specialization > subgroup
 * and updates accordingly on change event
 */

// faculty selection
select_fac.addEventListener("change", function () {
  let selected = select_fac.value;
  faculty = selected; // assign to global

  if (selected == "Select") {
    select_year.value = 0;
    select_year.disabled = true;
    select_1.disabled = true;
    select_1.value = "0";
    select_2.disabled = true;
    select_2.value = "0";
    select_3.disabled = true;
    select_3.value = "0";
  } else {
    let resultArr = Object.keys(keys.fac[faculty]); // data from JSON
    let html_content = '<option value="0">Select</option>';
    resultArr.forEach((element) => {
      html_content +=
        '<option value="' + element + '">' + element + "</option>";
    });

    select_year.innerHTML = html_content;
    select_year.disabled = false;
  }
});

// year selection
select_year.addEventListener("change", function () {
  // let faculty = select_fac.value;
  let selected = select_year.value;
  year = selected;

  // if selected 'select'
  if (selected == "0") {
    select_1.disabled = true;
    select_1.value = "0";
    select_2.disabled = true;
    select_2.value = "0";
    select_3.disabled = true;
    select_3.value = "0";
  } else {
    let resultArr = Object.keys(keys.fac[faculty][year]);
    if (resultArr == "") {
      select_1.disabled = true;
      select_1.value = "0";
      select_2.disabled = true;
      select_2.value = "0";
      select_3.disabled = true;
      select_3.value = "0";
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

// semester selection
select_1.addEventListener("change", function () {
  // let faculty = select_fac.value;
  let selected = select_1.value;
  semester = selected; // assign to global

  // if selected 'select'
  if (selected == "0") {
    select_2.disabled = true;
    select_2.value = "0";
    select_3.disabled = true;
    select_3.value = "0";
  } else {
    let resultArr = Object.keys(keys.fac[faculty][year][semester]);
    if (resultArr == "") {
      select_2.disabled = true;
      select_2.value = "0";
      select_3.disabled = true;
      select_3.value = "0";
    } else {
      let html_content = '<option value="0">Select</option>';
      resultArr.forEach((element) => {
        html_content +=
          '<option value="' + element + '">' + element + "</option>";
      });
      select_2.innerHTML = html_content;
      select_2.disabled = false;
    }
  }
});

// specialization selection
select_2.addEventListener("change", function () {
  // let faculty = select_fac.value;
  let selected = select_2.value;
  spec = selected; // assign to global

  // if selected 'select'
  if (selected == "0") {
    select_3.disabled = true;
    select_3.value = "0";
  } else {
    let resultArr = Object.keys(keys.fac[faculty][year][semester][spec]);
    if (resultArr == "") {
      select_3.disabled = true;
      select_3.value = "0";
    } else {
      let html_content = '<option value="0">Select</option>';
      resultArr.forEach((element) => {
        html_content +=
          '<option value="' + element + '">' + element + "</option>";
      });
      select_3.innerHTML = html_content;
      select_3.disabled = false;
    }
  }
});

// group selection
select_3.addEventListener("change", function () {
  // let faculty = select_fac.value;
  let selected = select_3.value;

  if (selected != "0") {
    sub = selected; // assign to global
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
  options[3] = document.getElementById("select-2").value;
  options[4] = document.getElementById("select-3").value;

  if (checkVals() == 1) {
    shake(detailsSection);
    detailsError("Select options for all");
  } else {
    // save details to cookies
    setDetails(options);
    displayUserData();
    displayTable();
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
}

function displayTable() {
  let table = keys.fac[faculty][year][semester][spec][sub].table;

  let num = table[dayToday].length;
  let html_content = "";

  if (num) {
    for (i = 0; i < num; i++) {
      html_content +=
        '<div class="card timecard" id="card' +
        (i + 1) +
        '">' +
        '<div class="row">' +
        '<p class="title">' +
        table[dayToday][i].mod +
        " <span id='module-code'>" +
        table[dayToday][i].code +
        "</span></p>" +
        '<p class="type">' +
        table[dayToday][i].type +
        "</p>" +
        "</div>" +
        '<div class="row">' +
        '<p class="time">' +
        table[dayToday][i].start +
        " - " +
        table[dayToday][i].end +
        "</p>" +
        "</div>" +
        "</div>";
    }
  } else {
    // code here
    html_content += "No lectures for today :-)";
  }

  document.getElementById("cards-container").innerHTML = html_content;
}

function displayTime() {
  let currentTime = document.getElementById("greeting-time");
  let now = new Date().toLocaleTimeString();
  currentTime.innerHTML = now;
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
  delCookie("semester");
  delCookie("spec");
  delCookie("sub");
}

// set details to cookies
function setDetails(options) {
  setCookie("username", username, 90);
  setCookie("faculty", options[0], 90);
  setCookie("year", options[1], 90);
  setCookie("semester", options[2], 90);
  setCookie("spec", options[3], 90);
  setCookie("sub", options[4], 90);
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

// run the displayTime() function in 1 sec intervals
let intervalHandle = setInterval(displayTime, 1000);
