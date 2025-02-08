const bedtimeBtn = document.getElementById("bedTime")

console.log(bedtimeBtn)

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
    console.log(data.results)
    for (const [cycle, time] of Object.entries(data)) {
      console.log(`${cycle}: ${time}`);
    }
  })
}


let currentTime = new Date();
console.log(currentTime);
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let seconds = currentTime.getSeconds();
console.log(hours);
console.log(minutes);
console.log(seconds);
