// Setting calander input to accept future dates only
const currentTime = new Date();
const calanderInput = document.getElementById("input-date");
const form = document.getElementById('myForm');


const setDateLimit = (timeLimit) => {
  let nowMinute = timeLimit.getMinutes();
  let nowHour = timeLimit.getHours();
  if (nowHour < 10) {
    nowHour = "0" + nowHour;
  }

  let nowDate = timeLimit.getDate();
  if (nowDate < 10) {
    nowDate = "0" + nowDate;
  }
 
  let nowMonth = timeLimit.getMonth() + 1;
  if (nowMonth < 10) {
    nowMonth = "0" + nowMonth;
  }
  const nowYear = timeLimit.getFullYear();

  calanderInput.setAttribute(
    "min",
    `${nowYear}-${nowMonth}-${nowDate} ${nowHour}:${nowMinute}`
  );
};
setDateLimit(currentTime);


const countdown = (date) => {
  // time in milliseconds
  const second = 1000;
  const minute = second * 60;
  const hour = minute *60;
  const day = hour * 24;
  // storing the current date and time to countdown from
  const now = currentTime.getTime();
  // storing date and time to countdown to 
  const countDate = new Date(date).getTime();
  // calculalate the difference
  const gap = countDate - now;
 
  // storing results in object
  const countdownResults = {
      day: Math.floor(gap / day),
      hour: Math.floor((gap % day)/hour),
      minute: Math.floor((gap % hour)/minute),
      second: Math.floor((gap % minute)/second)
  };
  return countdownResults;
}



const isValidDateTime = (dateTimeString) => {
    // The regular expression for date and time in "YYYY-MM-DD HH:mm" format
    const regEx = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return regEx.test(dateTimeString);
  } 
//! the function above returns true or false therefor if false date time format is wrong
