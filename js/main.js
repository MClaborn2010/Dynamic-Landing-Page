// DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus");

// Options
const showAmPm = true;
// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Set background and greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('img/Highway.jpg')";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Good Morning";
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('img/Rainy.jpeg')";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Good Afternoon";
    document.querySelector(".container").style.color = "white";
  } else {
    // Evening
    document.body.style.backgroundImage = "url('img/Night.jpeg')";
    document.body.style.backgroundSize = "cover";
    greeting.textContent = "Good Evening";
    document.querySelector(".container").style.color = "white";
  }
}

// Get Name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}
// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

// Set Name
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

// Get Name
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Clear input when clicked
function clearFocusInput() {
  if (focus.textContent == "[Enter Focus]") {
    focus.textContent = "";
  }
}
function addFocusInput() {
  if (focus.textContent == "") {
    focus.textContent = "[Enter Focus]";
  }
}
function addNameInput() {
  if (name.textContent == "") {
    name.textContent = "[Enter Name]";
  }
}

function clearNameInput() {
  if (name.textContent == "[Enter Name]") {
    name.textContent = "";
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", clearFocusInput);
focus.addEventListener("blur", addFocusInput);
name.addEventListener("blur", addNameInput);
name.addEventListener("click", clearNameInput);

// Run
showTime();
setBgGreet();
getName();
getFocus();
