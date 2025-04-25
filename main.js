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
    // Handles edge case: starts at 0 if equal
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
// Trigger Confetti if Goal Met
// ==========================

if (curr_total >= 40000000 && curr_total < 40020000) {
  fundraisingGoal();
}


// ==========================
// Animate Initial Values
// ==========================

countUpOrDown(parseFloat(daily_Prev_Total), parseFloat(daily_Curr_Total), dailyOverall, '£');
countUpOrDown(parseFloat(prev_total), parseFloat(curr_total), overall, '£');

countUpOrDown(parseFloat(prev_signups), parseFloat(curr_signups), signups_total);
countUpOrDown(parseFloat(prev_signups_24), parseFloat(curr_signups_24), signups_24);


// ==========================
// Refresh Page at 10:00 AM
// ==========================

function checkRefreshTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  console.log(now)
  console.log(hour)
  console.log(minute)

  if (hour === 10 && minute === 30) {
    // console.log("Refreshing at 10:00 AM");
    location.reload();
  }
}

// Check every minute
setInterval(checkRefreshTime, 60000);

// setInterval(() => {
  // console.log("⏰ 60 seconds have passed...");
// }, 60000);


// ==========================
// AJAX Utility (for future expansion)
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

// Example usage:
// setTimeout(() => event_check("update function"), 4000);
