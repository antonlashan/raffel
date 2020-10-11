"use strict";

const clientTextArea = document.getElementById("clients");
const winnersTextArea = document.getElementById("winners");

relaodTextArea();

function save() {
  const namesList = [];
  const lines = clientTextArea.value.split("\n");

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length > 0) {
      namesList.push(lines[i]);
    }
  }

  localStorage.setItem("AT_MOBILE_LIST", JSON.stringify(namesList));
}

function relaodTextArea() {
  const mobileList = JSON.parse(localStorage.getItem("AT_MOBILE_LIST")) || [];

  mobileList.forEach(mob => {
    clientTextArea.value += mob + "\n";
  });
}

function showWinners() {
  const selectedMobiles = JSON.parse(localStorage.getItem("AT_SELECTED_MOBILES")) || [];
  winnersTextArea.value = "";
  selectedMobiles.forEach(mob => {
    winnersTextArea.value += mob + "\n";
  });
  if (selectedMobiles.length > 0) {
    winnersTextArea.style.display = "block";
  }
}

function reset() {
  localStorage.removeItem("AT_MOBILE_LIST");
  localStorage.removeItem("AT_SELECTED_MOBILES");
  clientTextArea.value = "";
  winnersTextArea.value = "";
}
