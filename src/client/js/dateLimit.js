export function setDateLimit(limit) {
    let nowMinute = limit.getMinutes();
    let nowHour = limit.getHours();
    if (nowHour < 10) {
      nowHour = "0" + nowHour;
    }
  
    let nowDate = limit.getDate();
    if (nowDate < 10) {
      nowDate = "0" + nowDate;
    }
    let nowMonth = limit.getMonth() + 1;
    if (nowMonth < 10) {
      nowMonth = "0" + nowMonth;
    }
    const nowYear = limit.getFullYear();
    const calanderInputElement = document.getElementById("input-date");
    calanderInputElement.setAttribute(
      "min",
      `${nowYear}-${nowMonth}-${nowDate}T${nowHour}:${nowMinute}`);
  }