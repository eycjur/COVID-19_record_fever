// 時刻と体温を保持する辞書
interface logs {
  [time: string]: number;
}

// 0埋めしてlength桁にする
function pad0(num: number, length: number): string {
  return ("00000000" + String(num)).slice(-length);
}

// date形式の日付を文字列に変換（date2Stringは date to string の意味）
function date2String(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = pad0(date.getMonth() + 1, 2);
  const day: string = pad0(date.getDate(), 2);
  const hour: string = pad0(date.getHours(), 2);
  const minute: string = pad0(date.getMinutes(), 2);
  // let second: String = pad0(date.getSeconds(), 2);
  return `${year}-${month}-${day}T${hour}:${minute}:${minute}`;
}

function readLocalStorage(): logs {
  const logs: logs = JSON.parse(localStorage.getItem("log") || "{}");
  return logs;
}

function writeLocalStorage(logs: logs): void {
  localStorage.setItem("log", JSON.stringify(logs));
}

function btnClickIndex(obj: any = NaN): void {  // eslint-disable-line
  const elemTime: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("time")
  );
  const elemFever: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("fever")
  );

  console.log(elemTime.value);
  console.log(elemFever.value);

  const fever_time: logs = readLocalStorage();
  fever_time[elemTime.value] = Number(elemFever.value);
  writeLocalStorage(fever_time);

  console.log(localStorage);
}

document.addEventListener("DOMContentLoaded", function () {
  const button: HTMLButtonElement = <HTMLButtonElement>(
    document.getElementById("submit-button")
  );
  const elemTime: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.getElementById("time")
  );

  elemTime.setAttribute("value", date2String(new Date()));

  // buttonクリック時の挙動
  button.addEventListener("click", btnClickIndex);
});
