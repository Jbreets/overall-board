// Placement variables
let overall = document.querySelector('.overall-total')
let dailyOverall = document.getElementById('daily_overall')

let signups_total = document.getElementById('signups_total')
let signups_24 = document.getElementById('signups_24')

let counter = document.getElementById("counter");

// Data Variables

// Total Donations
let = curr_total = document.getElementById("curr_total").innerHTML
let = prev_total = document.getElementById("prev_total").innerHTML
// removes the whitespace from both of the strings
curr_total = curr_total.replace(/\s|,/g, '');
prev_total = prev_total.replace(/\s|,/g, '');

// Daily Donations
let = daily_Curr_Total = document.getElementById("daily_curr_total").innerHTML
let = daily_Prev_Total = document.getElementById("daily_prev_total").innerHTML
// removes the whitespace from both of the strings
daily_Curr_Total = daily_Curr_Total.replace(/\s|,/g, '');
daily_Prev_Total = daily_Prev_Total.replace(/\s|,/g, '');

// Total Subscribers
let = curr_signups = document.getElementById("curr_signups").innerHTML
let = prev_signups = document.getElementById("prev_signups").innerHTML
// Daily Subscribers
let = curr_signups_24 = document.getElementById("curr_signups_24").innerHTML
let = prev_signups_24 = document.getElementById("prev_signups_24").innerHTML


function fundraisingGoal() {
  // 
  // Confetti Function
  //
  
  const start = () => {
    setTimeout(function() {
        confetti.start()
    }, 10500); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
  };

  const stop = () => {
      setTimeout(function() {
          confetti.stop()
      }, 30000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
  };
  start();
  stop();
}


function formatNumberWithDecimalsAndCommas(number, key) {
  // 
  // Format number with commas and 2 decimal places 
  // 
  return parseFloat(number).toLocaleString('en-US', {minimumFractionDigits: key, maximumFractionDigits: key});
};


function countUpOrDown (startValue, endValue, Element, currency='') {

  const duration = 10000;
  let currentValue = startValue;
  const counterElement = Element
  let decimal = 0
  
  if (currency == '£') {
    decimal = 2
    // console.log(decimal)
  } else  {
    decimal = 0
  }

  if (startValue < endValue) {

    const step = (endValue - startValue) / (duration / 50);

    const interval = setInterval(() => {
      currentValue += step;
      if (currentValue >= endValue) {
          clearInterval(interval);
          currentValue = endValue; // Ensure we reach exactly the end value
      }
      counterElement.textContent = currency + formatNumberWithDecimalsAndCommas(currentValue, decimal);

  }, 50); // Update every 50 milliseconds

  } else if(startValue > endValue) {
    const step = (startValue - endValue) / (duration / 50);

    const interval = setInterval(() => {
      currentValue -= step;
      if (currentValue <= endValue) {
          clearInterval(interval);
          currentValue = endValue; // Ensure we reach exactly the end value
      }
      counterElement.textContent = currency + formatNumberWithDecimalsAndCommas(currentValue, decimal);
  }, 50); // Update every 50 milliseconds

  // If error starts at 0 and works its way up to current total
  } else {
      startValue = 0
      currentValue = 0

      const step = (endValue - startValue) / (duration / 50);

      const interval = setInterval(() => {
        currentValue += step;
        if (currentValue >= endValue) {
            clearInterval(interval);
            currentValue = endValue; // Ensure we reach exactly the end value
        }
        counterElement.textContent = currency + formatNumberWithDecimalsAndCommas(currentValue, decimal);
    }, 50);
  }
}

// Sets the goal region in which there is confetti - can change for any major goal
if (curr_total >= 40000000 && curr_total < 40020000) {

  fundraisingGoal()
  
}
// can have this function activate whenever a fundraising goal is met

countUpOrDown(parseFloat(daily_Prev_Total), parseFloat(daily_Curr_Total), dailyOverall, '£')
countUpOrDown(parseFloat(prev_total), parseFloat(curr_total), overall, '£')

countUpOrDown(parseFloat(prev_signups), parseFloat(curr_signups), signups_total)
countUpOrDown(parseFloat(prev_signups_24), parseFloat(curr_signups_24), signups_24)



// 
// Hourly refresh timer 
// 
const hours = 12;
// Convert hours to milliseconds
const milliseconds = hours * 60 * 60 * 1000;

// Function to refresh the page
function refreshPage() {
  location.reload();
}

// Set a timeout to call the refreshPage function after the specified time
setTimeout(refreshPage, milliseconds);

// Get current time and the target refresh time
const targetHourDay = 10;
const targetHourNight = 22; 
const tagetMinuite = 30;


// this function is recalling the time every 1 minute, so would just need to force refresh after a certain point
function getCurrentTime() {
  const currentTime = new Date();
  // console.log(`Current time: ${currentTime.toLocaleTimeString()}`);
  // console.log(currentHour, currentMinute)
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour === targetHourDay && currentMinute === tagetMinuite || currentHour === targetHourNight && currentMinute === tagetMinuite) {

    // refreshPage();

    // This functions how I want it to which is cool
    countUpOrDown(parseFloat(curr_total), parseFloat(35000000), counter, '£')
    
  } else {
    // console.log("Not quite that time yet")
  }
}


// Update the time every minute
const updateTime = setInterval(getCurrentTime, 60000); // 60000 milliseconds = 1 minute

// quality of life change that will make the updates more seemless

function event_check(testData) {
  console.log(testData);
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("counter").innerHTML = this.responseText;
}
  xhttp.open("GET", "functions.php?k="+testData);
  xhttp.send();
}

// let testData = "update function";
// event_check(testData)
// setTimeout(event_check(testData), 4000);


// new function would be 
// when time is met - re run the count up or down functions with the new varying totals

// AJAX flow map (Forgot how much of a pain in the arse this was)

// Refresh time is called -> Ajax connects to functions -> gets the new values -> prints old values into data spots -> runs the countup functions replacing the neccessary parameters

// Will need to remove before uploading to any sort of ftp / server
// got it working so far on the counter element but only with custom prompts
