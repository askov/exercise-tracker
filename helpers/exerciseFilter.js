module.exports = function (data, from, to, limit) {
  if (!Array.isArray(data)) return null;

  let fromDate = new Date(-8640000000000000);
  let toDate = new Date(8640000000000000);
  let lim = parseInt(limit) || data.length;

  if (from && Date.parse(from)) {
    fromDate = new Date(from);
  }
  if (to && Date.parse(to)) {
    toDate = new Date(to);
  }

  return data.filter(el => {
    // console.log('LIM', typeof el.date);
    return (el.date >= fromDate) && (el.date <= toDate);
  }).splice(0, lim);
};