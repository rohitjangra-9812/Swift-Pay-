export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';
  
  const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

  const convertWhole = (n: number) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + ' ' + a[n % 10];
    if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + (n % 100 === 0 ? '' : 'and ' + convertWhole(n % 100));
    if (n < 100000) return convertWhole(Math.floor(n / 1000)) + 'Thousand ' + (n % 1000 === 0 ? '' : convertWhole(n % 1000));
    if (n < 10000000) return convertWhole(Math.floor(n / 100000)) + 'Lakh ' + (n % 100000 === 0 ? '' : convertWhole(n % 100000));
    return convertWhole(Math.floor(n / 10000000)) + 'Crore ' + (n % 10000000 === 0 ? '' : convertWhole(n % 10000000));
  };

  const wholePart = Math.floor(num);
  const decimalPart = Math.round((num - wholePart) * 100);

  let str = convertWhole(wholePart).trim() + ' Rupees';
  if (decimalPart > 0) {
    str += ' and ' + convertWhole(decimalPart).trim() + ' Paise';
  }
  return str + ' Only';
}
