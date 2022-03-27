"use strict";
function pad0(num, length) {
    return ("00000000" + String(num)).slice(-length);
}
function date2String(date) {
    const year = date.getFullYear();
    const month = pad0(date.getMonth() + 1, 2);
    const day = pad0(date.getDate(), 2);
    const hour = pad0(date.getHours(), 2);
    const minute = pad0(date.getMinutes(), 2);
    return `${year}-${month}-${day}T${hour}:${minute}:${minute}`;
}
function readLocalStorage() {
    const logs = JSON.parse(localStorage.getItem("log") || "{}");
    return logs;
}
function writeLocalStorage(logs) {
    localStorage.setItem("log", JSON.stringify(logs));
}
function btnClickIndex(obj = NaN) {
    const elemTime = (document.getElementById("time"));
    const elemFever = (document.getElementById("fever"));
    console.log(elemTime.value);
    console.log(elemFever.value);
    const fever_time = readLocalStorage();
    fever_time[elemTime.value] = Number(elemFever.value);
    writeLocalStorage(fever_time);
    console.log(localStorage);
}
document.addEventListener("DOMContentLoaded", function () {
    const button = (document.getElementById("submit-button"));
    const elemTime = (document.getElementById("time"));
    elemTime.setAttribute("value", date2String(new Date()));
    button.addEventListener("click", btnClickIndex);
});
//# sourceMappingURL=index.js.map