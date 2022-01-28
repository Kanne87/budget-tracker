export const calcCurrency = (number) => {
   const result = number / 100;
   const formatter = {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "symbol",
    };
    const format = new Intl.NumberFormat('de-DE', formatter).format(result);
   return format
}

// Formatiere Text, damit er vom State gelesen werden kann
export const formatAmount = (number) => {
   const result = number /100;
   /* const result = parseFloat(
      number.replace(/,/g, ".")
    ).toFixed(2); */
   
return result;
}

export const replaceAmount = (number) => {
   const result = number.replace(/,/g, ".");
   return result;
}

