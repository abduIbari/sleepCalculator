const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");

let hours = parseInt(hoursElement.value);
let minutes = parseInt(minutesElement.value);

const hrUpBtn = document.querySelector(".hr-up");
const hrDownBtn = document.querySelector(".hr-down");

const minUpBtn = document.querySelector(".min-up");
const minDownBtn = document.querySelector(".min-down");

function formatTime(time) {
  if (time < 10) {
    return (time = "0" + time);
  }
  return time;
}

function hourUp() {
  if (hours == 23) {
    hours = 0;
  } else {
    hours++;
  }
  hoursElement.value = formatTime(hours);
}

function hourDown() {
  if (hours == 0) {
    hours = 23;
  } else {
    hours--;
  }
  hoursElement.value = formatTime(hours);
}

function minUp() {
  if (minutes == 59) {
    minutes = 0;
  } else {
    minutes++;
  }
  minutesElement.value = formatTime(minutes);
}

function minDown() {
  if (minutes == 0) {
    minutes = 59;
  } else {
    minutes--;
  }
  minutesElement.value = formatTime(minutes);
}

hrUpBtn.addEventListener("click", hourUp);
hrDownBtn.addEventListener("click", hourDown);

minUpBtn.addEventListener("click", minUp);
minDownBtn.addEventListener("click", minDown);
