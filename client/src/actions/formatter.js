const calcCurrency = (number) => {
   const formatter = {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "symbol",
    };
    const format = new Intl.NumberFormat('de-DE', formatter).format(number);
   return format
}
 export default calcCurrency