const toDDMMMYYYY = (date: Date) => (`${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ')} ${dataFormatting(date.getHours())}:${dataFormatting(date.getMinutes())}`);

const dataFormatting = (n: number) => (n > 9 ? `${n}` : `0${n}`);

export {
  toDDMMMYYYY,
  dataFormatting,
};
