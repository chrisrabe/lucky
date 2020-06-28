function getNumEven(pattern) {
    const data = pattern.split(',');
    return data.filter(num => num % 2 === 0).length;
}

function getProbabilityFromPattern(data, maxPositions) {
    const patterns = Array(maxPositions + 1).fill(0);

    for (const result of data) {
        const numEven = getNumEven(result);
        patterns[numEven]++;
    }

    // find success rate
    return patterns.map(val => val / data.length);
}

module.exports = {
    getProbabilityFromPattern,
    getNumEven
}
