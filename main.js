// Variables //

// store last version number to display update alerts

var thisVersion = "1.2.2"; // this must be updated only on a major change (not patches and bug fixes)

var username;
var keys = [];
const options = []; //array to hold options

var faculty, year, semester, spec, sub, randomSeed; // read values

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
let currentDay = d.getDay();
let dateToday = d.getDate();
let realDay = weekday[currentDay];
let dayToday = realDay;

window.addEventListener("load", (event) => {
  if (getCookie("username")) {
    username = getCookie("username");
    faculty = getCookie("faculty");
    year = getCookie("year");
    semester = getCookie("semester");
    spec = getCookie("spec");
    sub = getCookie("sub");
    randomSeed = getCookie("seed"); // random seed

    // read json file and get data to keys[]
    fetch("./data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => (keys = data))
      .then(function () {
        displayUserData();
        transition("splash-section", "main-section");
      });
  } else {
    transition("splash-section", "login-section");
    document.getElementById("username-field").focus();
  }
});

// DOM constants //
let continueBtn = document.getElementById("continue-btn");
let detailsBtn = document.getElementById("details-continue-btn");
let detailsBackBtn = document.getElementById("details-back-btn");
let mainBackBtn = document.getElementById("main-back-btn");
let logOutBtn = document.getElementById("logout-btn");
let username_field = document.getElementById("username-field");
let prev_btn = document.getElementById("left-nav-icon");
let next_btn = document.getElementById("right-nav-icon");

// SEQUENCE //

continueBtn.addEventListener("click", readUsername);
detailsBtn.addEventListener("click", readDetails);

// navigate through the week
prev_btn.addEventListener("click", function () {
  currentDay = currentDay - 1;
  if (currentDay < 0) {
    currentDay = 6;
  }
  dayToday = weekday[currentDay];
  displayTable();
});

next_btn.addEventListener("click", function () {
  currentDay = currentDay + 1;
  if (currentDay > 6) {
    currentDay = 0;
  }
  dayToday = weekday[currentDay];
  displayTable();
});

// details section >> fetch options from databse and display within html
let select_fac = document.getElementById("select-fac");
let select_year = document.getElementById("select-year");
let select_1 = document.getElementById("select-1");
let select_2 = document.getElementById("select-2");
let select_3 = document.getElementById("select-3");

// back buttons
//back btn in details section
detailsBackBtn.addEventListener("click", function () {
  transition("details-section", "login-section");
});
// back btn in main section
mainBackBtn.addEventListener("click", function () {
  transition("main-section", "details-section");
  getFacList();
});

// logout button
logOutBtn.addEventListener("click", function () {
  logOut();
  location.reload();
  // transition("main-section", "login-section");
});

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

// run the displayTime() function in 1 sec intervals
let intervalHandle = setInterval(displayTime, 1000);
