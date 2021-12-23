/* eslint-disable prettier/prettier */
import { helper } from "@ember/component/helper";

/*
  This helper ensures that the date displayed does not adjust
  for your local timezone. This prevents a flash of a date changing
  on load.
*/

export default helper(function dateFormat(params) {
  const date = new Date(params[0]);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "utc",
  });
});
