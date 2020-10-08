import { helper } from '@ember/component/helper';

export default helper(function plural([number], hash) {
  if (!hash || !hash.empty ||
      !hash.singular || !hash.plural) {
      throw new Error("you need to define `empty`, `singular` and `plural`");
  }

  if (number === 0) {
      return hash.empty.replace('%', number);
  } else if (number === 1) {
      return hash.singular.replace('%', number);
  } else if (number >= 2) {
      return hash.plural.replace('%', number);
  }
});
