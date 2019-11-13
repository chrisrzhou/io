// simple 'hacky' method plurarize words
export function pluralize(word, count) {
  let pluralized = word;
  if (count !== 1) {
    pluralized = word.endsWith('y')
      ? word.slice(0, -1).concat('ies')
      : word.concat('s');
  }
  return `${count} ${pluralized}`;
}
