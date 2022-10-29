const average = (marks, digits) => {
  if (marks.length === 0) {
    return 0;
  } else {
    const average = marks.reduce((prev, curr) => prev + curr) / marks.length;
    return average.toFixed(digits)
  };
};

module.exports = average;
