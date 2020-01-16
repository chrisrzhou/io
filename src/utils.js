import _ from 'lodash';

// simple 'hacky' method to plurarize words
export function pluralize(word, count) {
  let pluralized = word;
  if (count !== 1) {
    pluralized = word.endsWith('y')
      ? word.slice(0, -1).concat('ies')
      : word.concat('s');
  }
  return `${count} ${pluralized}`;
}

// parse an array of tags from an input string
export function parseTags(inputString) {
  const matches = inputString.match(/#\w+/g) || [];
  return matches.map(match => match.replace(/^#/, ''));
}

// summarize and count an array of tags with provided pathname
export function summarizeTags(values) {
  const tagsMap = values.reduce((tagsCount, value) => {
    if (!tagsCount[value]) {
      tagsCount[value] = 0;
    }
    tagsCount[value] += 1;
    return tagsCount;
  }, {});
  const tags = Object.keys(tagsMap).map(value => ({
    count: tagsMap[value],
    value,
  }));
  return _.orderBy(tags, ['count', 'value'], ['desc', 'asc']);
}
