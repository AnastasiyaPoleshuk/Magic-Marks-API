const average = (marks, digits) => {
    const average = marks.reduce((prev, curr) => prev + curr) / marks.length;
    return average.toFixed(digits)
}

module.exports = average;