window.addEventListener("load", () => {
  // DOM Elements
  let long;
  let lat;
  let temperatureDegreee = document.querySelector("#output");
  let temperatureSection = document.querySelector(".temperature-section");
  let temperatureSpan = document.querySelector(".temperature-section span");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let key = "8375fea328aa49dd3794823fd8b0a118";
  const time = document.getElementById("time"),
    greeting = document.getElementById("greeting"),
    name = document.getElementById("name"),
    focus = document.getElementById("focus"),
    apiKey = "e27cce663f9ce97ec1758fe4f176cd30",
    output = document.getElementById("output");

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
    time.innerHTML = `${hour}<span>:</span>${addZero(
      min
    )}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ""}`;

    setTimeout(showTime, 1000);
  }

  // Add Zeros
  function addZero(n) {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          // temperatureDegreee.textContent = Math.floor(temperature);
          temperatureDegreee.innerHTML = `<h4>${Math.floor(
            temperature
          )}&#176;</h4>`;
          temperatureDescription.innerText = summary;
          console.log(temperatureDescription.innerText);
          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          setIcons(icon, document.querySelector(".icon"));
        });
      function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        let currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        let today = new Date(),
          hour = today.getHours();
        //Early Morning
        if (hour < 6) {
          document.body.style.backgroundImage = "url('img/clearnight.jpeg')";
          greeting.textContent = "Good Morning";
          document.querySelector(".container").style.color = "white";
          console.log("Clear Early Morning");
        }
        // Rainy Early Morning
        else if (hour < 6 && currentIcon === "RAIN") {
          document.body.style.backgroundImage = "url('img/rainynight.jpg')";
          greeting.textContent = "Good Morning";
          document.querySelector(".container").style.color = "white";
          console.log("Rainy Early Morning");
        }
        // Clear Morning
        else if (hour < 12) {
          document.body.style.backgroundImage = "url('img/clearday.jpg')";
          greeting.textContent = "Good Morning";
          document.querySelector(".container").style.color = "black";
          console.log("Clear Morning");
        }
        // Rainy Morning
        else if (hour < 12 && currentIcon === "RAIN") {
          document.body.style.backgroundImage = "url('img/rainymorning.jpeg')";
          greeting.textContent = "Good Morning";
          document.querySelector(".container").style.color = "black";
          console.log("Rainy Morning");
        }
        // Cloudy Morning
        else if (hour < 12 && currentIcon === "PARTLY_CLOUDY_DAY") {
          document.body.style.backgroundImage = "url('img/rainymorning.jpeg')";
          greeting.textContent = "Good Morning";
          document.querySelector(".container").style.color = "black";
          console.log("Cloudy Morning");
        }
        //Afternoon
        else if (hour < 18 && temperatureDescription === "Clear") {
          document.body.style.backgroundImage = "url('img/clearafternoon.jpg')";
          greeting.textContent = "Good Afternoon";
          document.querySelector(".container").style.color = "black";
          document.querySelector(".temperature-section").style.color = "white";
          console.log("Clear Afternoon");
        }

        // Rainy Afternoon
        else if (hour < 18 && currentIcon === "RAIN") {
          document.body.style.backgroundImage = "url('img/rainyafternoon.jpg')";
          greeting.textContent = "Good Afternoon";
          document.querySelector(".container").style.color = "white";
          document.querySelector(".temperature-section").style.color = "white";
          console.log("Rainy Afternoon");
        }

        // Cloudy Afternoon
        else if (
          hour < 18 &&
          temperatureDescription.innerText === "Partly Cloudy"
        ) {
          document.body.style.backgroundImage =
            "url('img/partlycloudyday.jpg')";
          greeting.textContent = "Good Afternoon";
          document.querySelector(".container").style.color = "white";
          document.querySelector(".temperature-section").style.color = "white";
          console.log("Cloudy Afternoon");
        }

        // Rainy Night
        else if (hour < 24 && temperatureDescription.innerText === "Rain") {
          document.body.style.backgroundImage = "url('img/rainynight.jpg')";
          greeting.textContent = "Good Evening";
          document.querySelector(".container").style.color = "white";
        }
        // Cloudy Night
        else if (
          (hour < 24 && temperatureDescription.innerText === "Cloudy") ||
          temperatureDescription.innerText === "Partly Cloudy"
        ) {
          document.body.style.backgroundImage = "url('img/rainynight.jpg')";
          greeting.textContent = "Good Evening";
          document.querySelector(".container").style.color = "white";
        }
        // Clear Night
        else {
          document.body.style.backgroundImage = "url('img/clearnight.jpeg')";
          greeting.textContent = "Good Evening";
          document.querySelector(".container").style.color = "white";
          console.log(temperatureDescription.innerText);
        }

        return skycons.set(iconID, Skycons[currentIcon]);
      }
    });
  }

  // Set background and greeting

  // Get Name
  function getName() {
    if (
      localStorage.getItem("name") === null ||
      localStorage.getItem("name") === ""
    ) {
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
    if (
      localStorage.getItem("focus") === null ||
      localStorage.getItem("focus") === ""
    ) {
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
  getName();
  getFocus();
});

// CLEAR_DAY
// PARTLY_CLOUDY_DAY
// CLEAR_NIGHT
// CLEAR_NIGHT
// CLOUDY
// RAIN
// SLEET
// SNOW
// WIND
// FOG
