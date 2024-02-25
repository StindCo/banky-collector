const moment = require("moment");
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");

export function getAllByFilter(
  collects,
  { fromDate, toDate, selectedQuerytag }
) {
  let queryTag =
    toDate != null || fromDate != null ? "unknown" : selectedQuerytag;

  let afterDate = null;
  let beforeDate = null;

  switch (queryTag) {
    case "today":
      var x = new Date();
      x.setHours(x.getHours() - 24);
      afterDate = moment(x).format("DD-MM-YYYY HH:mm");
      break;

    case "week":
      var x = new Date();
      x.setDate(x.getDate() - 7);
      afterDate = x.toISOString();
      break;

    case "month":
      var x = new Date();
      x.setDate(x.getDate() - 30);
      afterDate = x.toISOString();
      break;
    case "year":
      var x = new Date();
      x.setFullYear(x.getFullYear() - 1);
      afterDate = x.toISOString();
      break;

    default:
      afterDate = fromDate;
      beforeDate = toDate;
      break;
  }

  let newCollectsAfterFilter = collects;

  if (afterDate != null && beforeDate == null) {
    newCollectsAfterFilter = collects.filter((collect) => {
      return dayjs(collect.created_at).isAfter(dayjs(afterDate));
    });
  } else if (afterDate == null && beforeDate != null) {
    newCollectsAfterFilter = collects.filter((collect) => {
      return dayjs(collect.created_at).isBefore(dayjs(beforeDate));
    });
  } else if (afterDate != null && beforeDate != null) {
    newCollectsAfterFilter = collects.filter((collect) => {
      return (
        dayjs(collect.created_at).isBefore(dayjs(beforeDate)) &&
        dayjs(collect.created_at).isAfter(dayjs(afterDate))
      );
    });
  }

  return newCollectsAfterFilter;
}
