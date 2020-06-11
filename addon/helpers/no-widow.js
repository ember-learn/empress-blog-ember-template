import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export default helper(function noWidow([string]) {
  // replace last occurrence of a space with a non-breaking space
  return htmlSafe(string.replace(/ ([^ ]*)$/, '&nbsp;$1'));
});
