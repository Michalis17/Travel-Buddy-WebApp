
 export const countdown = (date) => {
    // time in milliseconds
    const second = 1000;
    const minute = second * 60;
    const hour = minute *60;
    const day = hour * 24;
    // storing the current date and time to countdown from
    const currentTime = new Date().getTime();
    // storing date and time to countdown to 
    const countDate = new Date(date).getTime();
        // its in the future
          // calculalate the difference
    const gap = countDate - currentTime;
   
    // storing results in object
    const countdownResults = {
        day: Math.floor(gap / day),
        hour: Math.floor((gap % day)/hour),
        minute: Math.floor((gap % hour)/minute),
        second: Math.floor((gap % minute)/second)
    };
    return countdownResults; 
    
  
}
// TODO this function must validate date time format and fututre date time input 
// function isValidDateTime(dateTimeString) {

//     // The regular expression for date and time in "YYYY-MM-DD HH:mm" format
//     console.log(dateTimeString);
//     const regEx = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
//     return regEx.test(dateTimeString);
//   }  
  
//   console.log(isValidDateTime('2023-10-19T14:02'));
  
  
  