"use strict";
function pad0(num, length) {
    return ("00000000" + String(num)).slice(-length);
}
function date2StringInternal(date) {
    const year = date.getFullYear();
    const month = pad0(date.getMonth() + 1, 2);
    const day = pad0(date.getDate(), 2);
    const hour = pad0(date.getHours(), 2);
    const minute = pad0(date.getMinutes(), 2);
    const second = pad0(date.getSeconds(), 2);
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}
function readLocalStorage() {
    const logs = JSON.parse(localStorage.getItem("log") || "{}");
    return logs;
}
function writeLocalStorage(logs) {
    localStorage.setItem("log", JSON.stringify(logs));
}
function createTableContent(logs) {
    const tableBody = (document.getElementById("table-body"));
    tableBody.innerHTML = "";
    for (const time in logs) {
        const tr = document.createElement("tr");
        const tdTime = document.createElement("td");
        const tdFever = document.createElement("td");
        const tdDelete = document.createElement("td");
        tdTime.innerHTML = new Date(time).toLocaleString();
        tdFever.innerHTML = logs[time].toFixed(1);
        tdDelete.innerHTML = `<button class="btn btn-danger delete-button" time="${time}">削除</button>`;
        tr.appendChild(tdTime);
        tr.appendChild(tdFever);
        tr.appendChild(tdDelete);
        tableBody.appendChild(tr);
        addDeteleButtonEventListener();
    }
}
function addDeteleButtonEventListener() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", deleteElement);
    });
}
function deleteElement(obj = NaN) {
    const target = obj.target;
    const time = target.getAttribute("time");
    if (time === null) {
        return;
    }
    else if (time === undefined) {
        return;
    }
    const feverTime = readLocalStorage();
    delete feverTime[time];
    writeLocalStorage(feverTime);
    createContents(feverTime);
}
function sortDictionary(KeyValue) {
    const sortedKey = Object.keys(KeyValue).sort();
    const sortedKeyValue = {};
    sortedKey.forEach((time) => {
        sortedKeyValue[time] = KeyValue[time];
    });
    return sortedKeyValue;
}
function createChart(logs) {
    const ctx = (document.getElementById("canvas"));
    if (ctx === null) {
        console.error("canvas is null");
        return;
    }
}
function createContents(logs) {
    createTableContent(logs);
    createChart(logs);
}
function btnClickIndex(obj = NaN) {
    const elemTime = (document.getElementById("time"));
    const elemFever = (document.getElementById("fever"));
    const feverTime = readLocalStorage();
    feverTime[elemTime.value] = Number(elemFever.value);
    const sortedFeverTime = sortDictionary(feverTime);
    writeLocalStorage(sortedFeverTime);
    createContents(sortedFeverTime);
}
document.addEventListener("DOMContentLoaded", function () {
    const submitButton = (document.getElementById("submit-button"));
    const elemTime = (document.getElementById("time"));
    const elemClear = (document.getElementById("clear-button"));
    elemTime.setAttribute("value", date2StringInternal(new Date()));
    createContents(readLocalStorage());
    submitButton.addEventListener("click", btnClickIndex);
    elemClear.addEventListener("click", function () {
        writeLocalStorage({});
        createTableContent({});
    });
});
//# sourceMappingURL=index.js.map