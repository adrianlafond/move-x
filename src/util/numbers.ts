export function padZero(value: number): string {
  let str = `${value}`;
  while (str.length < 2) {
    str = '0' + str;
  }
  return str;
}
