// ==========================
// Placement Variables
// ==========================

const overall = document.querySelector('.overall-total');
const dailyOverall = document.getElementById('daily_overall');

const signups_total = document.getElementById('signups_total');
const signups_24 = document.getElementById('signups_24');

const counter = document.getElementById('counter');

// ==========================
// Data Variables
// ==========================

// Total Donations
let curr_total = document.getElementById('curr_total').innerHTML;
let prev_total = document.getElementById('prev_total').innerHTML;

// Daily Donations
let daily_Curr_Total = document.getElementById('daily_curr_total').innerHTML;
let daily_Prev_Total = document.getElementById('daily_prev_total').innerHTML;

// Total Subscribers
let curr_signups = document.getElementById('curr_signups').innerHTML;
let prev_signups = document.getElementById('prev_signups').innerHTML;

// Daily Subscribers
let curr_signups_24 = document.getElementById('curr_signups_24').innerHTML;
let prev_signups_24 = document.getElementById('prev_signups_24').innerHTML;

// Remove whitespace and commas
[curr_total, prev_total, daily_Curr_Total, daily_Prev_Total] =
  [curr_total, prev_total, daily_Curr_Total, daily_Prev_Total].map(val => val.replace(/\s|,/g, ''));


// ==========================
// Confetti Celebration
// ==========================

function fundraisingGoal() {
  const start = () => {
    setTimeout(() => confetti.start(), 10500);
  };

  const stop = () => {
    setTimeout(() => confetti.stop(), 30000);
  };

  start();
  stop();
}


// ==========================
// Utility Functions
// ==========================

function formatNumberWithDecimalsAndCommas(number, decimals) {
  return parseFloat(number).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function countUpOrDown(startValue, endValue, element, currency = '') {
  const duration = 10000;
  let currentValue = startValue;
  const decimal = (currency === '£') ? 2 : 0;

  if (startValue < endValue) {
    const step = (endValue - startValue) / (duration / 50);
    const interval = setInterval(() => {
      currentValue += step;
      if (currentValue >= endValue) {
        clearInterval(interval);
        currentValue = endValue;
      }
      element.textContent = currency + formatNumberWithDecimalsAndCommas(currentValue, decimal);
    }, 50);

  } else if (startValue > endValue) {
    const step = (startValue - endValue) / (duration / 50);
    const interval = setInterval(() => {
      currentValue -= step;
      if (currentValue <= endValue) {
        clearInterval(interval);
        currentValue = endValue;
      }
      element.textContent = currency + formatNumberWithDecimalsAndCommas(currentValue, decimal);
    }, 50);

  } else {
    startValue = 0;
    currentValue = 0;
    const step = (endValue - startValue) / (duration / 50);
    const interval = setInterval(() => {
      currentValue += step;
      if (currentValue >= endValue) {
        clearInterval(interval);
        currentValue = endValue;
      }
      element.textContent = currency + formatNumberWithDecimalsAndCommas(currentValue, decimal);
    }, 50);
  }
}


// ==========================
// Goal Check for Confetti
// ==========================

if (curr_total >= 40000000 && curr_total < 40020000) {
  fundraisingGoal();
}


// ==========================
// Animate Initial Numbers
// ==========================

countUpOrDown(parseFloat(daily_Prev_Total), parseFloat(daily_Curr_Total), dailyOverall, '£');
countUpOrDown(parseFloat(prev_total), parseFloat(curr_total), overall, '£');

countUpOrDown(parseFloat(prev_signups), parseFloat(curr_signups), signups_total);
countUpOrDown(parseFloat(prev_signups_24), parseFloat(curr_signups_24), signups_24);


// ==========================
// On-the-Hour Page Refresh
// ==========================

function refreshAtNextHour() {
  const now = new Date();
  const nextHour = new Date();

  nextHour.setHours(now.getHours() + 1);
  nextHour.setMinutes(0);
  nextHour.setSeconds(0);
  nextHour.setMilliseconds(0);

  const timeUntilNextHour = nextHour - now;

  console.log(timeUntilNextHour)

  console.log(`⏰ Refreshing in ${Math.round(timeUntilNextHour / 1000)} seconds`);

  setTimeout(() => {
    location.reload();

    // Repeat every hour afterward
    // setInterval(() => {
    //   location.reload();
    // }, 60 * 60 * 1000);

  }, timeUntilNextHour);
}

refreshAtNextHour();


// ==========================
// AJAX Data Fetching (Optional)
// ==========================

function event_check(testData) {
  console.log(testData);

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.getElementById("counter").innerHTML = this.responseText;
  };
  xhttp.open("GET", "functions.php?k=" + testData);
  xhttp.send();
}

// Example: event_check("update function");
