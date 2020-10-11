"use strict";

// Add list of names here
// const mobileList = ["Anne", "Bob", "Catherine", "Dave", "Erin", "Frank", "Gloria"];
let mobileList = [];

// Default variables
let hasStarted = false;
let i = 0;
let offset,
  interval,
  clock = 0;
let intervalHandle = null;
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const headerOne = document.getElementById("headerNames");
const timer = document.getElementById("timer");
const winner = document.getElementById("winner");

function displayNames() {
  intervalHandle = setInterval(function() {
    headerNames.textContent = mobileList[i++ % mobileList.length];
  }, 50);
}

function start(startButton) {
  hasStarted = true;
  mobileList = shuffle(JSON.parse(localStorage.getItem("AT_MOBILE_LIST")) || []);

  if (mobileList.length === 0) {
    return;
  }

  startButton.style.display = "none";
  stopButton.style.display = "block";
  winner.style.display = "none";
  startWatch();
  displayNames();
}

function stop(stopButton) {
  hasStarted = false;
  stopButton.style.display = "none";
  startButton.style.display = "block";
  winner.style.display = "block";
  clearInterval(intervalHandle);
  stopWatch();
  selectingMobile();
}

function selectingMobile() {
  const selectedMobile = headerOne.textContent;
  const selectedMobiles = JSON.parse(localStorage.getItem("AT_SELECTED_MOBILES")) || [];
  const mobileList = JSON.parse(localStorage.getItem("AT_MOBILE_LIST")) || [];

  selectedMobiles.push(selectedMobile);
  localStorage.setItem("AT_SELECTED_MOBILES", JSON.stringify(selectedMobiles));

  const filteredMobileList = mobileList.filter(function(mob) {
    return mob !== selectedMobile;
  });

  localStorage.setItem("AT_MOBILE_LIST", JSON.stringify(filteredMobileList));
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// Start or stop the name shuffle on button click
startButton.addEventListener("click", function() {
  start(this);
});
stopButton.addEventListener("click", function() {
  stop(this);
});

// Allow use of spacebar to start/stop name shuffle
document.body.onkeyup = function(e) {
  if (e.keyCode == 32) {
    if (!hasStarted) {
      start(startButton);
    } else {
      stop(stopButton);
    }
  }
};

function startWatch() {
  resetWatch();
  if (!interval) {
    offset = Date.now();
    interval = setInterval(updateWatch, 10);
  }
}

function stopWatch() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

function resetWatch() {
  clock = 0;
  renderWatch(0);
}

function updateWatch() {
  clock += delta();
  renderWatch();
}

function renderWatch() {
  timer.innerHTML = formatTime(clock);
}

function delta() {
  var now = Date.now(),
    d = now - offset;

  offset = now;
  return d;
}

function pad(num, size) {
  var s = "0000" + num;
  return s.substr(s.length - size);
}

function formatTime(time) {
  var h,
    m,
    s,
    ms = 0;
  var newTime = "";

  h = Math.floor(time / (60 * 60 * 1000));
  time = time % (60 * 60 * 1000);
  m = Math.floor(time / (60 * 1000));
  time = time % (60 * 1000);
  s = Math.floor(time / 1000);
  ms = time % 1000;

  newTime = pad(m, 2) + ":" + pad(s, 2);
  return newTime;
}
