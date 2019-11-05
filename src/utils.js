// simple 'hacky' method plurarize words
export function pluralize(word, count) {
  if (count === 1) {
    return word;
  }

  return word.endsWith('y')
    ? word.slice(0, -1).concat('ies')
    : word.concat('s');
}
