export const calcCurrency = (number) => {
  const result = number / 100;
  const formatter = {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: "symbol",
  };
  const format = new Intl.NumberFormat("de-DE", formatter).format(result);
  return format;
};

// Formatiere Text, damit er vom State gelesen werden kann
export const formatAmount = (number) => {
  const result = number / 100;
  /* const result = parseFloat(
      number.replace(/,/g, ".")
    ).toFixed(2); */

  return result;
};

export const replaceAmount = (number) => {
  const result = number.replace(/,/g, ".");
  return result;
};

// Formatiert das Datum beim Importieren im Format 01.01.22 in ein Date Object um.
export const formatImportDate = (date) => {
  const result =
    date !== undefined &&
    new Date(
      20 + date.substr(date.length - 2, date.length),
      date.charAt(3) === "0" ? date.charAt(4) - 1 : date.substr(3, 4) - 1,
      date.substr(0, 2)
    );
    const finalResult = date !== undefined ? result : new Date();
  return finalResult;
};

export const formatImportAmount = (amount) => {
  if (amount !== "") {
   return parseInt(amount.replace(/,/g, ".")*100);
  } else { return ""}
}