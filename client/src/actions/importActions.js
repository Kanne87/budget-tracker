import { IMPORT_ITEMS, IMPORT_LOADING } from "./types";

export const importItems = (data) => (dispatch) => {
  dispatch({ type: IMPORT_LOADING });
  const csvFile = data;
  const csvArray = [];
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    processCSV(text);
  };
  reader.readAsText(csvFile);
  const processCSV = (str, delim = ";") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });
    dispatch({ type: IMPORT_ITEMS, payload: newArray });
  };
};
