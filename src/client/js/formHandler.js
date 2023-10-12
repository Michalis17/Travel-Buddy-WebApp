// Setting calander input to accept future dates only
const currentTime = new Date();
const calanderInput = document.getElementById("input-date");
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
  // console.log(nowDate)
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
// TODO: set up server and start setting up webpack 
// storing user trip info input

// Date time format checker 
// !this function will be used before using the date time input
const isValidDateTime = (dateTimeString) => {
    // The regular expression for date and time in "YYYY-MM-DD HH:mm" format
    const regEx = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    return regEx.test(dateTimeString);
  } 
//! the function above returns true or false therefor if false date time format is wrong
