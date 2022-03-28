// 時刻と体温を保持する辞書
interface logs {
  [time: string]: number;
}

// 0埋めしてlength桁にする
function pad0(num: number, length: number): string {
  return ("00000000" + String(num)).slice(-length);
}

// date形式の日付を文字列に変換
function date2StringInternal(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = pad0(date.getMonth() + 1, 2);
  const day: string = pad0(date.getDate(), 2);
  const hour: string = pad0(date.getHours(), 2);
  const minute: string = pad0(date.getMinutes(), 2);
  const second: string = pad0(date.getSeconds(), 2);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}
function date2StringDisplay(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = pad0(date.getMonth() + 1, 2);
  const day: string = pad0(date.getDate(), 2);
  const hour: string = pad0(date.getHours(), 2);
  const minute: string = pad0(date.getMinutes(), 2);
  // let second: String = pad0(date.getSeconds(), 2);
  return `${year}-${month}-${day} ${hour}:${minute}:${minute}`;
}

function readLocalStorage(): logs {
  const logs: logs = JSON.parse(localStorage.getItem("log") || "{}");
  return logs;
}

function writeLocalStorage(logs: logs): void {
  localStorage.setItem("log", JSON.stringify(logs));
}

function createTableContent(logs: logs) {
  const tableBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById("table-body")
  );

  tableBody.innerHTML = "";

  for (const time in logs) {
    const tr: HTMLTableRowElement = document.createElement("tr");
    const tdTime: HTMLTableCellElement = document.createElement("td");
    const tdFever: HTMLTableCellElement = document.createElement("td");
    const tdDelete: HTMLTableCellElement = document.createElement("td");

    tdTime.innerHTML = new Date(time).toLocaleString();
    tdFever.innerHTML = logs[time].toFixed(1);
    tdDelete.innerHTML = `<button class="btn btn-danger" onclick="btnClickDelete('${time}')">削除</button>`;

    tr.appendChild(tdTime);
    tr.appendChild(tdFever);
    tr.appendChild(tdDelete);

    tableBody.appendChild(tr);
  }
}

function sortDictionary(KeyValue: logs): logs {
  const sortedKey: string[] = Object.keys(KeyValue).sort();
  const sortedKeyValue: logs = {};
  sortedKey.forEach((time: string) => {
    sortedKeyValue[time] = KeyValue[time];
  });
  return sortedKeyValue;
}

function btnClickIndex(obj: any = NaN): void {  // eslint-disable-line
  const elemTime: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("time")
  );
  const elemFever: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("fever")
  );

  const feverTime: logs = readLocalStorage();
  feverTime[elemTime.value] = Number(elemFever.value);

  const sortedFeverTime: logs = sortDictionary(feverTime);

  writeLocalStorage(sortedFeverTime);
  createTableContent(sortedFeverTime);
}

document.addEventListener("DOMContentLoaded", function () {
  const submitButton: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("submit-button")
  );
  const elemTime: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("time")
  );
  const elemClear: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("clear-button")
  );

  elemTime.setAttribute("value", date2StringInternal(new Date()));
  createTableContent(readLocalStorage());
  // buttonクリック時の挙動
  submitButton.addEventListener("click", btnClickIndex);
  elemClear.addEventListener("click", function () {
    writeLocalStorage({});
    createTableContent({});
  });
});
