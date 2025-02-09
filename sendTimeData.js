const bedtimeBtn = document.getElementById("bedTime")


bedtimeBtn.addEventListener("click", () => {
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")

  const hours = parseInt(hoursElement.value)
  const minutes = parseInt(minutesElement.value)

  calculateBedtime(hours, minutes)
})

function calculateBedtime(hours, minutes){
  fetch("./bedTime.php", {
    method: "POST",
    headers: {
      "Content-type" : "application/json",
    },
    body : JSON.stringify({hours, minutes})
  })
  .then(response => response.json())
  .then(data => {
    for (const [cycle, time] of Object.entries(data)) {
      console.log(`${cycle}: ${time}`);
    }
  })
}

const wakeupBtn = document.getElementById("wakeupTime")

wakeupBtn.addEventListener("click", () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  calculateWakeupTime(hours, minutes)
})

function calculateWakeupTime(hours, minutes){
  fetch("./wakeupTime.php", {
    method: "POST",
    headers: {
      "Content-type" : "application/json",
    },
    body : JSON.stringify({hours, minutes})
  })
  .then(response => response.json())
  .then(data => {
    for (const [cycle, time] of Object.entries(data)) {
      console.log(`${cycle}: ${time}`);
    }
  })
}
