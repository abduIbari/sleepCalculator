const bedtimeBtn = document.getElementById("bedTime");
const goBackBtn = document.getElementById("goBack");

bedtimeBtn.addEventListener("click", () => {
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");

  const hours = parseInt(hoursElement.value);
  const minutes = parseInt(minutesElement.value);

  calculateBedtime(hours, minutes);
});

function calculateBedtime(hours, minutes) {
  fetch("../backend/bedTime.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ hours, minutes }),
  })
    .then((response) => response.json())
    .then((data) => {
      let dataContainer = document.querySelector(".container");

      dataContainer.style.opacity = "0";

      setTimeout(() => {
        dataContainer.innerHTML = `<div class="bedtime-container">
        <h3 class="page-subheading">Bedtime</h3>
        <p>The average human takes 15 minutes to fall asleep.</p>
        <p>To wake up refreshed at <strong>${hours}:${minutes}</strong>, you need to go to sleep at one of the following times:</p>
        <div class="display-time-container">
          ${Object.entries(data)
            .map(
              ([cycle, time], index) => `
              <div class="time-box-${index < 2 ? "suggested" : "rest"}">
                ${time}
              </div>
            `
            )
            .join("")}
        </div>
        <p>If you wake up at one of these times, you’ll rise in between 90-minute sleep cycles. A good night’s sleep consists of 5-6 complete sleep cycles.</p>
        <button id="goBack">Go back</button>
      </div>
    `;
        dataContainer.style.opacity = "1";

        document.getElementById("goBack").addEventListener("click", () => {
          dataContainer.style.opacity = "0";

          setTimeout(() => {
            window.location.href = "index.html"; 
          }, 200); 
        });
      }, 200);
    });
}

const wakeupBtn = document.getElementById("wakeupTime");

wakeupBtn.addEventListener("click", () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  calculateWakeupTime(hours, minutes);
});

function calculateWakeupTime(hours, minutes) {
  fetch("../backend/wakeupTime.php", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ hours, minutes }),
  })
    .then((response) => response.json())
    .then((data) => {
      let dataContainer = document.querySelector(".container");

      dataContainer.style.opacity = "0";

      setTimeout(() => {
        dataContainer.innerHTML = `<div class="wakeup-container">
      <h3 class="page-subheading">Wake-up time</h3>
      <p>The average human takes 15 minutes to fall asleep.</p>
      <p>If you go to sleep right now, you should try to wake up at one of the following times:</p>
      <div class="display-time-container">
        ${Object.entries(data)
          .map(
            ([cycle, time], index) => `
            <div class="time-box-${index < 2 ? "suggested" : "rest"}">
              ${time}
            </div>
          `
          )
          .join("")}
      </div>
      <p>If you wake up at one of these times, you’ll rise in between 90-minute sleep cycles. A good night’s sleep consists of 5-6 complete sleep cycles.</p>
      <button id="goBack">Go back</button>
    </div>
  `;
        dataContainer.style.opacity = "1";

        document.getElementById("goBack").addEventListener("click", () => {
          dataContainer.style.opacity = "0";

          setTimeout(() => {
            window.location.href = "index.html"; 
          }, 200); 
        });
      }, 200);
    });
}
