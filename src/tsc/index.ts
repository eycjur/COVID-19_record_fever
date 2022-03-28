import Chart from "chart.js/auto";

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
    tdDelete.innerHTML = `<button class="btn btn-danger delete-button" time="${time}">削除</button>`;

    tr.appendChild(tdTime);
    tr.appendChild(tdFever);
    tr.appendChild(tdDelete);

    tableBody.appendChild(tr);
    addDeteleButtonEventListener();
  }
}

function addDeteleButtonEventListener(): void {
  const deleteButtons: NodeListOf<Element> =
    document.querySelectorAll(".delete-button");
  deleteButtons.forEach((deleteButton: Element) => {
    deleteButton.addEventListener("click", deleteElement);
  });
}

function deleteElement(obj: any = NaN): void {  // eslint-disable-line
  // クリックされた要素を取得
  const target: Element = obj.target;
  const time = target.getAttribute("time");

  if (time === null) {
    return;
  } else if (time === undefined) {
    return;
  }

  const feverTime: logs = readLocalStorage();
  delete feverTime[time];

  writeLocalStorage(feverTime);
  createContents(feverTime);
}

function sortDictionary(KeyValue: logs): logs {
  const sortedKey: string[] = Object.keys(KeyValue).sort();
  const sortedKeyValue: logs = {};
  sortedKey.forEach((time: string) => {
    sortedKeyValue[time] = KeyValue[time];
  });
  return sortedKeyValue;
}

function createChart(logs: logs): void {
  const ctx: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("canvas")
  );
  if (ctx === null) {
    console.error("canvas is null");
    return;
  }

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(logs).map((time: string) => {
        return new Date(time).toLocaleString();
      }),
      datasets: [
        {
          label: "体温",
          data: Object.values(logs),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    // options: {
    //   title: {
    //     display: true,
    //     text: "体温グラフ",
    //   },
    //   scales: {
    //     yAxes: [
    //       {
    //         ticks: {
    //           callback: function (value, index, values) {
    //             console.log(value);
    //             console.log(index);
    //             return value + "度";
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
  });
}

function createContents(logs: logs): void {
  createTableContent(logs);
  createChart(logs);
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
  createContents(sortedFeverTime);
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
  createContents(readLocalStorage());

  // buttonクリック時の挙動
  submitButton.addEventListener("click", btnClickIndex);
  elemClear.addEventListener("click", function () {
    writeLocalStorage({});
    createTableContent({});
  });
});
