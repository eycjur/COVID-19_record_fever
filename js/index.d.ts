interface logs {
    [time: string]: number;
}
declare function pad0(num: number, length: number): string;
declare function date2StringInternal(date: Date): string;
declare function readLocalStorage(): logs;
declare function writeLocalStorage(logs: logs): void;
declare function createTableContent(logs: logs): void;
declare function addDeteleButtonEventListener(): void;
declare function deleteElement(obj?: any): void;
declare function sortDictionary(KeyValue: logs): logs;
declare function createChart(logs: logs): void;
declare function createContents(logs: logs): void;
declare function btnClickIndex(obj?: any): void;
//# sourceMappingURL=index.d.ts.map